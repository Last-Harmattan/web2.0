export interface Post {
  id: String;
  author: String;
  date: String;
  content: String;
  likes: Number;
  dislikes: Number;
  comments: Array<Comment>;
}
