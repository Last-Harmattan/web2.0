import { Comment } from './Comment';

export interface Post {
  _id?: string;
  author: string;
  date: string; //ISO-8601
  content: string;
  likes: Number;
  dislikes: Number;
  comments: Array<Comment>;
}
