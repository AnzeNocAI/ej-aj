import rss from '@astrojs/rss';
import { getPosts, postPath } from '../lib';
import { SITE } from '../site';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    customData: '<language>sl-si</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      // Full article HTML (content:encoded) for feed readers and email tools.
      content: post.rendered?.html,
    })),
  });
}
