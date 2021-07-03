export interface CommentDB {
  _id?: string;
  _rev?: string;
  type: string;
  postId: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
}
