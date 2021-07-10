export interface NewestPostInfo {
  _id?: string;
  _rev?: string;
  _deleted?: boolean;
  type: string;
  timeStamp: string; //ISO-8061
}
