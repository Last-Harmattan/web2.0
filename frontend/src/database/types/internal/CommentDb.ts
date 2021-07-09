/**
 * Interface that represents the comment document stored in
 * the database.
 *
 * @interface CommentDB
 * @member _id - Id of the comment
 * @member _rev - Revision id of the Comment
 * @member type - Type of the document to separate different documents in the database
 * @member postId - Id of the post that the comment belongs to
 * @member author - Name of the author of these comment
 * @member date - Date on that the comment was written
 * @member content - Content of the comment
 * @member likes - Number of likes of the comment
 * @member dislikes - Number of dislikes of the comment
 */
export interface CommentDB {
  _id?: string;
  _rev?: string;
  type: string;
  postId: string;
  author: string;
  date: string;
  content: string;
  likes: number | null;
  dislikes: number | null;
}
