import { Comment } from './Comment';

/**
 * @interface Post
 * @member _id - Id of the post in the database
 * @member author - Name of the author of these post
 * @member date - Date on that the post was written
 * @member content - Content of the post
 * @member likes - number of likes of the post
 * @member dislikes - number of dislikes of the post
 */
export interface Post {
  _id?: string;
  author: string;
  date: string; //ISO-8601
  content: string;
  likes: number;
  dislikes: number;
  comments: Array<Comment>;
}
