export class Post {
  id: String;
  author: String;
  date: String;
  content: String;
  likes: Number;
  dislikes: Number;
  comments: Array<Comment>;

  constructor(
    id: String,
    author: String,
    date: String,
    content: String,
    likes: Number,
    dislikes: Number,
    comments: Array<Comment>
  ) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.content = content;
    this.likes = likes;
    this.dislikes = dislikes;
    this.comments = comments;
  }
}
