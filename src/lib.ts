import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('novice', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Guides are evergreen, so their URL drops the date prefix of the file name.
export function guideSlug(id: string) {
  return id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function postPath(post: CollectionEntry<'novice'>) {
  return post.data.type === 'vodnik' ? `/vodniki/${guideSlug(post.id)}/` : `/novice/${post.id}/`;
}
