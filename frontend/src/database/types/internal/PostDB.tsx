export interface PostDB {
  _id: string;
  _rev?: string;
  author: string;
  date: string;
  content: string;
  likes: Number;
  dislikes: Number;
  comments: Array<Number>;
}
