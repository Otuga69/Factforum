export type categories = 'sveltetkit' | 'svelte';

export type Post = {
  title: string;
  date: string;
  slug: string;
  description: string;
  categories: categories[];
  published: boolean;
};

export type PostData = {
  meta: Post;
  content: string;
  likes: number;
};