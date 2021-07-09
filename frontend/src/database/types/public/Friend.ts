/**
 * @interface Friend
 * @member _id - Id of the Friend in the database
 * @member userId - id of the user itself
 * @member userName - Name of the friend
 * @member lastOnline - Timestamp where the friend was last online
 */
export interface Friend {
  _id?: string; //id assigned in the db
  userId: string; //id of the userItself
  userName: string;
  lastOnline: string;
}
