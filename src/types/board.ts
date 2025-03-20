// src/types/board.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  comments: Comment[];
  attachments?: Attachment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  size: number;
}
