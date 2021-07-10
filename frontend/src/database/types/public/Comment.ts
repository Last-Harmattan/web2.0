/**
 * Represents a Comment object with that can be worked outside of the database
 *
 * @interface Comment
 * @member _id - Id of the post
 * @member author - Name of the author of these post
 * @member date - Date on that the post was written
 * @member content - Content of the post
 * @member likes - Number of likes of the post
 * @member dislikes - Number of dislikes of the post
 */
export interface Comment {
  _id?: string;
  authorId: string;
  date: string; //ISO-8601
  content: string;
  likes: number;
  dislikes: number;
}
