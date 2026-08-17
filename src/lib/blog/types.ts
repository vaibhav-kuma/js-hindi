export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  slug: string;
  content: string;
  readingTime: string;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}