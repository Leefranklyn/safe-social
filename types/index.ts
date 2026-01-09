export interface User {
  id: string;
  username: string;
}

export interface Comment {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
}

export interface Post {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
  likes: number;
  dislikes: number;
  comments: Comment[];
}
