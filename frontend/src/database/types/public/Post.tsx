import { Comment } from './Comment';

export interface Post {
  _id?: string;
  author: string;
  date: string;
  content: string;
  likes: Number;
  dislikes: Number;
  comments: Array<Comment>;
}
