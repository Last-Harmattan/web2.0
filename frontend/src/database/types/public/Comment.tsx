export interface Comment {
  _id?: string;
  postId: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
}
