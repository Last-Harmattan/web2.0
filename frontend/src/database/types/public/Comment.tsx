export interface Comment {
  _id?: string;
  author: string;
  date: string; //ISO-8601
  content: string;
  likes: number;
  dislikes: number;
}
