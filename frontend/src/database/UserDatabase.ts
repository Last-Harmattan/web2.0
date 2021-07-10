import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import { AllDocumentsInterface, AllDocsError } from './types/internal/AllDocumentsInterface';
import { DbEntryMethaData } from './types/internal/DbEntryMethaData';
import { FriendDB } from './types/internal/FriendDB';
import { UserDataDB } from './types/internal/UserDataDB';
import { Friend } from './types/public/Friend';
import { UserData } from './types/public/UserData';
import { UserDBTypeMapper } from './UserDBTypeMapper';

PouchDB.plugin(find);

/**
 * Wrapper Class for the UserDb
 *
 * @class
 */
export class UserDatabase {
  private db: PouchDB.Database<UserDataDB | FriendDB>;

  constructor() {
    this.db = new PouchDB('Web20DB_USER_DB');
  }

  /**
   * Saves the given userData in the database
   *
   * @param userData Userdata to be saved in the database
   * @returns {Promise<DbEntryMethaData>} Promise with the status of the database action
   */
  saveNewUserData(userData: UserData): Promise<DbEntryMethaData> {
    const userDataDB: UserDataDB = {
      _id: userData._id,
      type: 'userData',
      userName: userData.userName,
      lastOnline: userData.lastOnline,
      publicKey: userData.publicKey,
      privateKey: userData.privateKey,
    };

    return this.db.post(userDataDB);
  }

  /**
   * Updates all properties the userdata in the database with the properties
   * of the given userData object
   *
   * @param userData Userdata to be updated in the database
   * @returns
   */
  updateUserData(userData: UserData): Promise<DbEntryMethaData> {
    return this.db.get<UserDataDB>(userData._id).then(userDataDB => {
      userDataDB.lastOnline = userData.lastOnline;
      userDataDB.privateKey = userData.privateKey;
      userDataDB.publicKey = userData.publicKey;
      userDataDB.userName = userData.userName;

      return this.db.put(userDataDB);
    });
  }

  /**
   * Returns the stored userData from the database.
   * If no userData were stored null is returned instead
   *
   * @returns {Promise<DbEntryMethaData | null}
   */
  getUserData(): Promise<UserData | null> {
    return this.db.find({ selector: { type: 'userData' } }).then(function onSuccess(findResult) {
      if (findResult.docs.length === 0) {
        return null;
      } else {
        return UserDBTypeMapper.mapToUserData(findResult.docs[0] as UserDataDB);
      }
    });
  }

  /**
   * Deletes the userdata with the given databaseId
   *
   * @param id DatabaseId of the userData to be deleted
   * @returns {Promise<DbEntryMethaData>} Promise with the result of the database action
   */
  deleteUserData(id: string): Promise<DbEntryMethaData> {
    return this.db.get<UserDataDB>(id).then(userDataDB => {
      return this.db.remove({ _id: userDataDB._id!, _rev: userDataDB._rev! });
    });
  }

  /**
   * Stores the given friend object in the Database.
   *
   * @param friend Friend object to be stored in the database
   * @returns {Promise<DbEntryMethaData>} Promise with the result of the database action
   */
  addFriend(friend: Friend): Promise<DbEntryMethaData> {
    const friendDB: FriendDB = {
      _id: friend._id,
      type: 'friend',
      userName: friend.userName,
      lastOnline: friend.lastOnline,
    };

    return this.db.post(friendDB);
  }

  /**
   * Updates all properties the friend object in the database with the properties
   * of the given friend object
   *
   * @param friend Friend object to be updated
   * @returns {Promise<DbEntryMethaData>} Promise with the result of the database action
   */
  updateFriend(friend: Friend): Promise<DbEntryMethaData> {
    return this.db.get(friend._id!).then(friendDB => {
      return this.db.put({
        ...friendDB,
        lastOnline: friend.lastOnline,
        userName: friend.userName,
      });
    });
  }

  /**
   * Returns the Friend Object with the given Id
   *
   * @param _id Id of the friend
   * @returns {Promise<Friend>} Promise with either the friend object or an error object
   */
  getFriend(_id: string): Promise<Friend> {
    return this.db.get(_id).then(function onSuccess(friendDB) {
      return UserDBTypeMapper.mapToFriend(friendDB as FriendDB);
    });
  }

  /**
   * Searches the database for the given ids and puts
   * then into a map with the assigned username
   *
   * If a username is not found the key has the value "not_found",
   * the username otherwise
   *
   * @param userIds Ids of the friends
   */
  getUsernamesToIds(userIds: string[]): Promise<Map<string, string>> {
    return this.db
      .allDocs({ include_docs: true, keys: userIds })
      .then(function onSuccess(results: AllDocumentsInterface<FriendDB>) {
        const idToNames: Map<string, string> = new Map<string, string>();

        for (const result of results.rows) {
          //can be asserted non null, because include_docs is set to true in query
          if ('error' in result.doc!) {
            result.doc as AllDocsError;
            idToNames.set(result.doc.key, result.doc.error);
          } else {
            idToNames.set(result.doc!._id, result.doc!.userName);
          }
        }

        return idToNames;
      });
  }

  /**
   * Returns the timeStamp the friend was last online
   *
   * @param _id Id of the friend in the database
   * @returns
   */
  getTimeStampFriendWasLastOnline(_id: string): Promise<string> {
    return this.db.get<FriendDB>(_id).then(function onSuccess(friend: FriendDB) {
      return friend.lastOnline;
    });
  }

  /**
   * Updates the TimeStamp of the Friend was last online
   *
   * @param _id Id of the friend in the Database
   * @param iso8061DateString Timespamp to be stored in ISO-8061
   * @returns
   */
  updateTimeStampFriendWasLastOnline(
    _id: string,
    iso8061DateString: string
  ): Promise<DbEntryMethaData> {
    return this.db.get<FriendDB>(_id).then((friend: FriendDB) => {
      friend.lastOnline = iso8061DateString;

      return this.db.put(friend);
    });
  }

  /**
   * Returns a list of all friends in the database
   * Returns null if no friends are in the database.
   *
   * @returns {Promise<Array<Friend> | null>}
   */
  getAllFriends(): Promise<Array<Friend> | null> {
    return this.db.find({ selector: { type: 'friend' } }).then(function onSuccess(findResults) {
      if (findResults.docs.length === 0) {
        return null;
      } else {
        return UserDBTypeMapper.mapFriendsDBToFriends(findResults.docs as FriendDB[]);
      }
    });
  }

  /**
   * Deletes the friend with the given Id.
   *
   * @param id DatabaseId of the friend to be deleted
   * @returns {Promise<Friend>} Promise with either the friend object or an error object
   */
  deleteFriend(id: string): Promise<DbEntryMethaData> {
    return this.db.get(id).then(friendDB => {
      return this.db.remove({ _id: friendDB._id!, _rev: friendDB._rev! });
    });
  }

  /**
   * Deletes the whole database
   *
   * @returns {Promise<void>} Promise with the result of the database deletion
   */
  deleteDB(): Promise<void> {
    return this.db.destroy();
  }
}
