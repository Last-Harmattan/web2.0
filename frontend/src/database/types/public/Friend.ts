export interface Friend {
  _id?: string; //id assigned in the db
  userId: string; //id of the userItself
  userName: string;
  lastOnline: string;
}
