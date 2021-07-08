import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import { UserData } from './types/public/UserData';
import { Friend } from './types/public/Friend';

PouchDB.plugin(find);

export class UserDatabase {
  private db: PouchDB.Database<{}>;

  constructor() {
    this.db = new PouchDB('Web20DB_USER_DB');
  }

  saveNewUserData(userData: UserData) {}

  updateUserData(userData: UserData) {}

  /**
   * Deleting the userData will also delete the friends
   * wich is basically a reset of the database.
   */
  deleteUserData() {}

  addFriend(friend: Friend) {}

  updateFriend(friend: Friend) {}

  deleteFriend(id) {}
}
