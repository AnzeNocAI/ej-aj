import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('novice', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
