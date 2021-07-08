export interface UserDataDB {
  _id?: string;
  _rev?: string;
  type: string;
  userID: string;
  userName: string;
  lastOnline: string;
  privateKey: string;
  publicKey: string;
}
