export interface FriendDB {
  _id?: string; //id assigned in the database
  _rev?: string;
  type: string;
  userId: string; //id of the user itself
  userName: string;
  lastOnline: string;
}
