export interface Comment {
  _id: string;
  _rev?: string;
  postId: string;
  author: string;
  date: Date;
  content: string;
  likes: number;
  dislikes: number;
}
