/**
 * Interface that represents the post document stored in
 * the database.
 *
 * @interface PostDB
 * @member _id - Id of the post
 * @member _rev - Revision id of the post
 * @member type - Type of the document to separate different documents in the database
 * @member author - Name of the author of these post
 * @member date - Date on that the post was written
 * @member content - Content of the post
 * @member likes - number of likes of the post
 * @member dislikes - number of dislikes of the post
 */
export interface PostDB {
  _id?: string;
  _rev?: string;
  type: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  dislikes: number;
}
