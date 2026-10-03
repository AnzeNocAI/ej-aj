// Small dependency-free SVG charts for /statistika/. Each chart root is a <figure class="viz">
// with a JSON config in <script type="application/json">. The same numbers are rendered as a
// table in the page (server side), so tooltips never gate a value.

type Series = { name: string; color: string; values: (number | null)[] };
type LineCfg = { type: 'line'; x: string[]; xPos?: number[]; series: Series[]; toggle?: boolean };
type BarsCfg = { type: 'bars'; rows: string[]; series: Series[] };
type RankRow = { koda: string; ime: string; v: number };
type RankCfg = {
  type: 'rank';
  views: { key: string; label: string; rows: RankRow[]; eu?: number; ref?: { label: string; v: number }; note: string }[];
};
type Cfg = LineCfg | BarsCfg | RankCfg;

const SVG = 'http://www.w3.org/2000/svg';
const fmt = new Intl.NumberFormat('sl-SI', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct = (v: number) => `${fmt.format(v)} %`;

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent?: Element) {
  const node = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  parent?.appendChild(node);
  return node;
}

function text(parent: Element, x: number, y: number, value: string, cls: string, anchor = 'start') {
  const t = el('text', { x, y, class: cls, 'text-anchor': anchor }, parent);
  t.textContent = value;
  return t;
}

function niceMax(v: number) {
  const steps = [5, 10, 20, 25, 40, 50, 60, 80, 100];
  return steps.find((s) => s >= v) ?? Math.ceil(v / 10) * 10;
}

// Bar with a 4px rounded data end and a square baseline end (horizontal bars grow to the right).
function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w, h / 2);
  if (w <= 0) return '';
  return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`;
}

class Tooltip {
  box: HTMLDivElement;
  constructor(root: HTMLElement) {
    this.box = document.createElement('div');
    this.box.className = 'viz-tip';
    this.box.hidden = true;
    root.appendChild(this.box);
  }
  show(root: HTMLElement, x: number, y: number, title: string, rows: { name: string; color: string; value: string }[]) {
    this.box.replaceChildren();
    const h = document.createElement('div');
    h.className = 'viz-tip-title';
    h.textContent = title;
    this.box.appendChild(h);
    for (const r of rows) {
      const row = document.createElement('div');
      row.className = 'viz-tip-row';
      const key = document.createElement('span');
      key.className = 'viz-key-line';
      key.style.background = r.color;
      const val = document.createElement('strong');
      val.textContent = r.value;
      const name = document.createElement('span');
      name.textContent = r.name;
      row.append(key, val, name);
      this.box.appendChild(row);
    }
    this.box.hidden = false;
    // x and y arrive in plot coordinates; the tooltip is positioned inside the figure.
    const plot = root.querySelector<HTMLElement>('.viz-plot');
    x += plot?.offsetLeft ?? 0;
    y += plot?.offsetTop ?? 0;
    const w = root.clientWidth;
    const bw = this.box.offsetWidth;
    const left = x + 14 + bw > w ? x - 14 - bw : x + 14;
    this.box.style.left = `${Math.max(0, left)}px`;
    this.box.style.top = `${Math.max(0, y)}px`;
  }
  hide() {
    this.box.hidden = true;
  }
}

function legend(root: HTMLElement, series: Series[], shape: 'line' | 'rect', onToggle?: (i: number) => void) {
  const wrap = document.createElement('div');
  wrap.className = 'viz-legend';
  series.forEach((s, i) => {
    const item = document.createElement(onToggle ? 'button' : 'span');
    item.className = 'viz-legend-item';
    const key = document.createElement('span');
    key.className = shape === 'line' ? 'viz-key-line' : 'viz-key-rect';
    key.style.background = s.color;
    const label = document.createElement('span');
    label.textContent = s.name;
    item.append(key, label);
    if (onToggle && item instanceof HTMLButtonElement) {
      item.type = 'button';
      item.setAttribute('aria-pressed', 'true');
      item.addEventListener('click', () => {
        const on = item.getAttribute('aria-pressed') !== 'true';
        item.setAttribute('aria-pressed', String(on));
        onToggle(i);
      });
    }
    wrap.appendChild(item);
  });
  root.insertBefore(wrap, root.querySelector('.viz-plot'));
}

// Series colors are CSS custom properties, applied through style so dark mode swaps them live.
const colorOf = (_root: HTMLElement, token: string) => `var(${token})`;

function lineChart(root: HTMLElement, plot: HTMLElement, cfg: LineCfg) {
  const hidden = new Set<number>();
  const tip = new Tooltip(root);
  const series = cfg.series.map((s) => ({ ...s, color: colorOf(root, s.color) }));
  if (series.length > 1) {
    legend(root, series, 'line', cfg.toggle ? (i) => {
      if (hidden.has(i)) hidden.delete(i);
      else if (hidden.size < series.length - 1) hidden.add(i);
      draw();
    } : undefined);
  }
  let index = cfg.x.length - 1;

  function draw() {
    plot.replaceChildren();
    const W = plot.clientWidth || 600;
    const H = 260;
    const m = { t: 16, r: 16, b: 28, l: 40 };
    const visible = series.map((s, i) => ({ s, i })).filter(({ i }) => !hidden.has(i));
    const maxV = Math.max(...visible.flatMap(({ s }) => s.values.filter((v): v is number => v !== null)));
    const step = [1, 2, 5, 10, 20, 25].find((st) => (maxV * 1.05) / st <= 5) ?? 25;
    const yMax = Math.max(step, Math.ceil((maxV * 1.05) / step) * step);
    const ticks = Math.round(yMax / step);
    const xs = cfg.xPos ?? cfg.x.map((_, i) => i);
    const x0 = Math.min(...xs), x1 = Math.max(...xs);
    const X = (i: number) => m.l + ((xs[i] - x0) / (x1 - x0 || 1)) * (W - m.l - m.r);
    const Y = (v: number) => m.t + (1 - v / yMax) * (H - m.t - m.b);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': root.dataset.label ?? '' }, plot);

    for (let k = 0; k <= ticks; k++) {
      const v = step * k;
      el('line', { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), class: k === 0 ? 'viz-axis' : 'viz-grid' }, svg);
      text(svg, m.l - 8, Y(v) + 4, `${v} %`, 'viz-tick', 'end');
    }
    const every = W < 480 && cfg.x.length > 6 ? 2 : 1;
    cfg.x.forEach((label, i) => {
      if (i % every === 0 || i === cfg.x.length - 1) text(svg, X(i), H - 8, label, 'viz-tick', 'middle');
    });

    for (const { s } of visible) {
      const d = s.values.map((v, i) => (v === null ? '' : `${i === 0 || s.values[i - 1] === null ? 'M' : 'L'}${X(i)},${Y(v)}`)).join('');
      el('path', { d, fill: 'none', style: `stroke:${s.color}`, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
      const last = s.values.length - 1;
      if (s.values[last] !== null) el('circle', { cx: X(last), cy: Y(s.values[last]!), r: 4, style: `fill:${s.color}`, class: 'viz-dot' }, svg);
    }

    const cross = el('line', { y1: m.t, y2: H - m.b, class: 'viz-cross', visibility: 'hidden' }, svg);
    const hit = el('rect', { x: m.l - 10, y: 0, width: W - m.l - m.r + 20, height: H, fill: 'transparent', tabindex: 0 }, svg);
    const at = (i: number) => {
      index = i;
      cross.setAttribute('x1', String(X(i)));
      cross.setAttribute('x2', String(X(i)));
      cross.setAttribute('visibility', 'visible');
      const rows = visible
        .filter(({ s }) => s.values[i] !== null)
        .sort((a, b) => (b.s.values[i] ?? 0) - (a.s.values[i] ?? 0))
        .map(({ s }) => ({ name: s.name, color: s.color, value: pct(s.values[i]!) }));
      tip.show(root, X(i), m.t, cfg.x[i], rows);
    };
    const nearest = (px: number) => {
      let best = 0;
      xs.forEach((_, i) => { if (Math.abs(X(i) - px) < Math.abs(X(best) - px)) best = i; });
      return best;
    };
    hit.addEventListener('pointermove', (e) => {
      const r = svg.getBoundingClientRect();
      at(nearest(((e.clientX - r.left) / r.width) * W));
    });
    hit.addEventListener('pointerleave', () => { cross.setAttribute('visibility', 'hidden'); tip.hide(); });
    hit.addEventListener('focus', () => at(index));
    hit.addEventListener('blur', () => { cross.setAttribute('visibility', 'hidden'); tip.hide(); });
    hit.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { at(Math.max(0, index - 1)); e.preventDefault(); }
      if (e.key === 'ArrowRight') { at(Math.min(cfg.x.length - 1, index + 1)); e.preventDefault(); }
    });
  }
  draw();
  return draw;
}

function barsChart(root: HTMLElement, plot: HTMLElement, cfg: BarsCfg) {
  const tip = new Tooltip(root);
  const series = cfg.series.map((s) => ({ ...s, color: colorOf(root, s.color) }));
  if (series.length > 1) legend(root, series, 'rect');

  function draw() {
    plot.replaceChildren();
    const W = plot.clientWidth || 600;
    const narrow = W < 520;
    const labelW = narrow ? 0 : Math.min(260, W * 0.36);
    const bar = 14, gap = 2, groupPad = narrow ? 30 : 16;
    const groupH = series.length * bar + (series.length - 1) * gap;
    const m = { t: 4, r: 56, l: labelW + 8 };
    const H = m.t + cfg.rows.length * (groupH + groupPad + (narrow ? 18 : 0));
    const maxV = Math.max(...series.flatMap((s) => s.values.filter((v): v is number => v !== null)));
    const xMax = niceMax(maxV);
    const Xw = (v: number) => (v / xMax) * (W - m.l - m.r);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': root.dataset.label ?? '' }, plot);
    el('line', { x1: m.l, x2: m.l, y1: 0, y2: H, class: 'viz-axis' }, svg);

    cfg.rows.forEach((label, r) => {
      const top = m.t + r * (groupH + groupPad + (narrow ? 18 : 0)) + (narrow ? 18 : 0);
      if (narrow) text(svg, m.l, top - 6, label, 'viz-label');
      else text(svg, labelW, top + groupH / 2 + 4, label, 'viz-label', 'end');
      series.forEach((s, k) => {
        const v = s.values[r];
        if (v === null) return;
        const y = top + k * (bar + gap);
        const w = Math.max(1, Xw(v));
        const p = el('path', { d: barPath(m.l, y, w, bar), style: `fill:${s.color}`, class: 'viz-bar', tabindex: 0 }, svg);
        text(svg, m.l + w + 6, y + bar - 3, pct(v), 'viz-value');
        const show = () => {
          const rows = series.filter((q) => q.values[r] !== null).map((q) => ({ name: q.name, color: q.color, value: pct(q.values[r]!) }));
          tip.show(root, m.l + w, y, label, rows);
        };
        p.addEventListener('pointerenter', show);
        p.addEventListener('focus', show);
        p.addEventListener('pointerleave', () => tip.hide());
        p.addEventListener('blur', () => tip.hide());
      });
    });
  }
  draw();
  return draw;
}

function rankChart(root: HTMLElement, plot: HTMLElement, cfg: RankCfg) {
  const tip = new Tooltip(root);
  let view = cfg.views[0];
  const note = root.querySelector<HTMLElement>('.viz-view-note');

  if (cfg.views.length > 1) {
    const tabs = document.createElement('div');
    tabs.className = 'viz-tabs';
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Izberi kazalnik');
    for (const v of cfg.views) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = v.label;
      b.setAttribute('aria-pressed', String(v === view));
      b.addEventListener('click', () => {
        view = v;
        tabs.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        draw();
      });
      tabs.appendChild(b);
    }
    root.insertBefore(tabs, plot);
  }

  function draw() {
    plot.replaceChildren();
    if (note) note.textContent = view.note;
    const W = plot.clientWidth || 600;
    const hi = colorOf(root, '--s1');
    const rest = colorOf(root, '--ref');
    const labelW = W < 480 ? 92 : 120;
    const bar = 14, pad = 6;
    const m = { t: 22, r: 52, l: labelW + 8 };
    const H = m.t + view.rows.length * (bar + pad) + 4;
    const xMax = niceMax(Math.max(...view.rows.map((r) => r.v), view.ref?.v ?? 0));
    const Xw = (v: number) => (v / xMax) * (W - m.l - m.r);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, role: 'img', 'aria-label': `${root.dataset.label ?? ''}: ${view.label}` }, plot);

    view.rows.forEach((row, i) => {
      const y = m.t + i * (bar + pad);
      const si = row.koda === 'SI';
      text(svg, labelW, y + bar - 3, row.ime, si ? 'viz-label viz-strong' : 'viz-label', 'end');
      const p = el('path', { d: barPath(m.l, y, Math.max(1, Xw(row.v)), bar), style: `fill:${si ? hi : rest}`, class: 'viz-bar', tabindex: si ? 0 : -1 }, svg);
      if (si || i === 0) text(svg, m.l + Xw(row.v) + 6, y + bar - 3, pct(row.v), si ? 'viz-value viz-strong' : 'viz-value');
      const show = () => tip.show(root, m.l + Xw(row.v), y, row.ime, [{ name: `${i + 1}. mesto od ${view.rows.length}`, color: si ? hi : rest, value: pct(row.v) }]);
      p.addEventListener('pointerenter', show);
      p.addEventListener('focus', show);
      p.addEventListener('pointerleave', () => tip.hide());
      p.addEventListener('blur', () => tip.hide());
    });
    el('line', { x1: m.l, x2: m.l, y1: m.t - 4, y2: H, class: 'viz-axis' }, svg);
    // Reference line: an explicit one, else the EU average.
    const ref = view.ref ?? (view.eu !== undefined ? { label: 'EU', v: view.eu } : undefined);
    if (ref) {
      const x = m.l + Xw(ref.v);
      el('line', { x1: x, x2: x, y1: m.t - 6, y2: H, class: 'viz-ref-line' }, svg);
      text(svg, x, m.t - 10, `${ref.label} ${pct(ref.v)}`, 'viz-tick', 'middle');
    }
  }
  draw();
  return draw;
}

for (const root of document.querySelectorAll<HTMLElement>('figure.viz')) {
  const cfgNode = root.querySelector('script[type="application/json"]');
  const plot = root.querySelector<HTMLElement>('.viz-plot');
  if (!cfgNode || !plot) continue;
  const cfg = JSON.parse(cfgNode.textContent || '{}') as Cfg;
  const draw = cfg.type === 'line' ? lineChart(root, plot, cfg) : cfg.type === 'bars' ? barsChart(root, plot, cfg) : rankChart(root, plot, cfg);
  let last = plot.clientWidth;
  new ResizeObserver(() => {
    if (Math.abs(plot.clientWidth - last) > 4) { last = plot.clientWidth; draw(); }
  }).observe(plot);
}
