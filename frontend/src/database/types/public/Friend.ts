/**
 * @interface Friend
 * @member _id - Id of the Friend in the database
 * @member userId - id of the user itself
 * @member userName - Name of the friend
 * @member lastOnline - Timestamp where the friend was last online
 */
export interface Friend {
  _id: string; //id assigned in the db and the userId itself (userIds are unique)
  userName: string;
  lastOnline: string;
}
