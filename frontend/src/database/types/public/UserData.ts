/**
 * @interface UserData
 * @member _id - Id of the userData in the database and the user itself (userIds are unique)
 * @member userName - Name of the user
 * @member lastOnline - timestamp when user was last online saved in //ISO-8601
 * @member privateKey - private Key for authentificationwith server
 * @member publicKey - public Key that belongs to the private key
 */
export interface UserData {
  _id: string;
  userName: string;
  lastOnline: string; //ISO-8601
  privateKey: string;
  publicKey: string;
}
