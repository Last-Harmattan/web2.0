import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import { UserDBTypeMapper } from './UserDBTypeMapper';
import { DbEntryMethaData } from './types/internal/DbEntryMethaData';
import { FindResults } from './types/internal/FindResults';
import { UserDataDB } from './types/internal/UserDataDB';
import { FriendDB } from './types/internal/FriendDB';
import { UserData } from './types/public/UserData';
import { Friend } from './types/public/Friend';

PouchDB.plugin(find);

export class UserDatabase {
  private db: PouchDB.Database<{}>;

  constructor() {
    this.db = new PouchDB('Web20DB_USER_DB');
  }

  saveNewUserData(userData: UserData): Promise<DbEntryMethaData> {
    const userDataDB: UserDataDB = {
      type: 'userData',
      userID: userData.userID,
      userName: userData.userName,
      lastOnline: userData.lastOnline,
      publicKey: userData.publicKey,
      privateKey: userData.privateKey,
    };

    return this.db.post(userDataDB);
  }

  updateUserData(userData: UserData): Promise<DbEntryMethaData> {
    return this.db.get<UserDataDB>(userData._id).then((userDataDB: UserDataDB) => {
      userDataDB.userID = userData.userID;
      userDataDB.lastOnline = userData.lastOnline;
      userDataDB.privateKey = userData.privateKey;
      userDataDB.publicKey = userData.publicKey;
      userDataDB.userName = userData.userName;

      return this.db.put(userDataDB);
    });
  }

  getUserData(): Promise<UserData> {
    return this.db
      .find({ selector: { type: 'userData' } })
      .then(function onSuccess(findResult: FindResults) {
        return UserDBTypeMapper.mapToUserData(findResult.docs[0]);
      });
  }

  /**
   * Deleting the userData will also delete the friends
   * wich is basically a reset of the database.
   */
  deleteUserData() {}

  addFriend(friend: Friend) {}

  updateFriend(friend: Friend) {}

  getFriend() {}

  getAllFriends() {}

  deleteFriend(id) {}
}
