/**
 * @interface FriendDB
 * @member _id - Id of the Friend in the database
 * @member _rev - Revision Id of the Friend in the database
 * @member type - Type identifier for find Plugin in the database / For FriendDB 'UserData'
 * @member userId - id of the user itself
 * @member userName - Name of the friend
 * @member lastOnline - Timestamp where the friend was last online
 */
export interface FriendDB {
  _id?: string;
  _rev?: string;
  type: string;
  userId: string;
  userName: string;
  lastOnline: string;
}
