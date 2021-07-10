import { UserDatabase } from './UserDatabase';
import { UserData } from './types/public/UserData';
import { Friend } from './types/public/Friend';

export function saveNewUserDataTest(userData: UserData) {
  const db = new UserDatabase();

  db.saveNewUserData(userData).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function getUserDataTest() {
  const db = new UserDatabase();

  db.getUserData().then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function editUserDataTest(userData: UserData) {
  const db = new UserDatabase();

  db.updateUserData(userData).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function deleteUserDataTest(id: string) {
  const db = new UserDatabase();

  db.deleteUserData(id).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function saveNewFriendTest(friend: Friend) {
  const db = new UserDatabase();

  db.addFriend(friend).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function getFriendByIdTest(id: string) {
  const db = new UserDatabase();

  db.getFriend(id).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function editFriendTest(friend: Friend) {
  const db = new UserDatabase();

  db.updateFriend(friend).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function deleteFriendTest(id: string) {
  const db = new UserDatabase();

  db.deleteFriend(id).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function getAllFriendsTest() {
  const db = new UserDatabase();

  db.getAllFriends().then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function deleteDatabaseTest() {
  const db = new UserDatabase();

  db.deleteDB().then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function genericTest() {
  const db = new UserDatabase();

  db.getUsernamesToIds(['TestId', 'Mongo']).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}
