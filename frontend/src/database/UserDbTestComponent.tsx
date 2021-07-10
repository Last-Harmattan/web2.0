import React from 'react';
import { UserData } from './types/public/UserData';
import { Friend } from './types/public/Friend';
import * as UserDbTests from './UserDbTests';

export class UserDbTestComponent extends React.Component {
  saveNewUserData = () => {
    const userData: UserData = this.readUserData();

    UserDbTests.saveNewUserDataTest(userData);
  };

  editUserData = () => {
    const userData: UserData = this.readUserData();

    UserDbTests.editUserDataTest(userData);
  };

  getUserData = () => {
    UserDbTests.getUserDataTest();
  };

  deleteUserData = () => {
    const userData: UserData = this.readUserData();

    UserDbTests.deleteUserDataTest(userData._id!);
  };

  saveNewFriend = () => {
    const friend: Friend = this.readFriend();

    UserDbTests.saveNewFriendTest(friend);
  };

  getFriendById = () => {
    const friend: Friend = this.readFriend();

    UserDbTests.getFriendByIdTest(friend._id!);
  };

  editFriend = () => {
    const friend: Friend = this.readFriend();

    UserDbTests.editFriendTest(friend);
  };

  deleteFriend = () => {
    const friend: Friend = this.readFriend();

    UserDbTests.deleteFriendTest(friend._id!);
  };

  getAllFriends = () => {
    UserDbTests.getAllFriendsTest();
  };

  deleteDatabase = () => {
    UserDbTests.deleteDatabaseTest();
  };

  genericTest = () => {
    UserDbTests.genericTest();
  };

  private readUserData(): UserData {
    let dbId = (document.getElementById('UserDataDbId') as HTMLInputElement).value;
    let userName = (document.getElementById('UserDataUserName') as HTMLInputElement).value;
    let lastOnline = (document.getElementById('UserDataLastOnline') as HTMLInputElement).value;
    let publicKey = (document.getElementById('UserDataPublicKey') as HTMLInputElement).value;
    let privateKEy = (document.getElementById('UserDataPrivateKey') as HTMLInputElement).value;

    return {
      _id: dbId,
      userName: userName,
      lastOnline: lastOnline,
      publicKey: publicKey,
      privateKey: privateKEy,
    };
  }

  private readFriend(): Friend {
    let dbId = (document.getElementById('FriendDbId') as HTMLInputElement).value;
    let friendUserName = (document.getElementById('FriendUserName') as HTMLInputElement).value;
    let friendLastOnline = (document.getElementById('FriendLastOnline') as HTMLInputElement).value;

    return {
      _id: dbId,
      userName: friendUserName,
      lastOnline: friendLastOnline,
    };
  }

  render() {
    return (
      <>
        <h1>UserDB Test</h1>
        <h2>Add/Edit/Delete UserDataTest</h2>
        <label>_id (Database ID)</label>
        <br></br>
        <input id='UserDataDbId'></input>
        <br></br>
        <label>UserName</label>
        <br></br>
        <input id='UserDataUserName'></input>
        <br></br>
        <label>lastOnline</label>
        <br></br>
        <input id='UserDataLastOnline'></input>
        <br></br>
        <label>publicKey</label>
        <br></br>
        <input id='UserDataPublicKey'></input>
        <br></br>
        <label>privateKey</label>
        <br></br>
        <input id='UserDataPrivateKey'></input>
        <br></br>
        <button onClick={this.saveNewUserData}>Save UserData</button>
        <button onClick={this.editUserData}>Update UserData</button>
        <button onClick={this.deleteUserData}>Delete UserData</button>
        <button onClick={this.getUserData}>Get UserData</button>
        <br></br>
        <br></br>

        <h2>Add/Edit/Delte FriendTest</h2>
        <label>_id (Database ID)</label>
        <br></br>
        <input id='FriendDbId'></input>
        <br></br>
        <label>UserName</label>
        <br></br>
        <input id='FriendUserName'></input>
        <br></br>
        <label>lastOnline</label>
        <br></br>
        <input id='FriendLastOnline'></input>
        <br></br>
        <button onClick={this.saveNewFriend}>Save Friend</button>
        <button onClick={this.editFriend}>Update Friend</button>
        <button onClick={this.deleteFriend}>Delete Friend</button>
        <button onClick={this.getFriendById}>GetFriend by Id</button>
        <br></br>
        <br></br>
        <button onClick={this.getAllFriends}>Get all Friends</button>
        <br></br>
        <br></br>

        <button onClick={this.deleteDatabase}>Delete Database</button>
        <br></br>
        <br></br>

        <button onClick={this.genericTest}>GenericTest</button>
      </>
    );
  }
}
