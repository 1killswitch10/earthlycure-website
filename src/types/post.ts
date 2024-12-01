export interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: 'remedy' | 'article' | 'tip' | 'story';
    likes: number;
    comments: number;
    isLiked?: boolean;
  }
  
  export type PostCategory = Post['category'];
  
  export interface CreatePostData {
    title: string;
    excerpt: string;
    category: PostCategory;
    content: string;
  }