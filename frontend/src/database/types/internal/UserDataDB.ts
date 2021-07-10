/**
 * @interface UserDataDB
 * @member _id - Id of the userData in the database
 * @member _rev - Revision Id of the UserDataDb in the database
 * @member type - Type identifier for find Plugin in the database / For UserDtaDB 'UserData'
 * @member userID - Id of the User
 * @member userName - Name of the user
 * @member lastOnline - timestamp when user was last online saved in //ISO-8601
 * @member privateKey - private Key for authentificationwith server
 * @member publicKey - public Key that belongs to the private key
 */
export interface UserDataDB {
  _id: string;
  _rev?: string;
  type: string;
  userName: string;
  lastOnline: string;
  privateKey: string;
  publicKey: string;
}
