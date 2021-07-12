const baseUrl = 'http://localhost:8800/api/call';

export type UserId = string;
export type UserLocation = string;

export interface RegisterPayload {
  userName: string;
  location: UserLocation;
  // TODO: Public key and signature.
}

/**
 * Performs a registration request to the backend.
 * @param payload
 * @returns
 */
export async function register(payload: RegisterPayload): Promise<UserId> {
  const { userName, location } = payload;
  const url = `${baseUrl}/createUser?USERNAME=${decodeURIComponent(
    userName
  )}&LOCATION=${decodeURIComponent(location)}`;
  const response = await fetch(url, {
    method: 'POST',
  });
  const { id }: { id: string } = await response.json();
  return id;
}

export interface SearchUserResponse {
  userId: UserId;
  userName: string;
  location: UserLocation;
}

/**
 * Finds a user with her id, username and location by a username.
 * @param userName
 * @returns
 */
export async function searchUser(userName: string): Promise<SearchUserResponse | null> {
  const url = `${baseUrl}/search?USERNAME=${decodeURIComponent(userName)}`;
  const response = await fetch(url);
  const res = (await response.json()) as { id: string; username: string; location: string }[];
  if (!Array.isArray(res) || res.length < 1) {
    return null;
  }

  const userdesc = res[0];
  return {
    userId: userdesc.id,
    userName: userdesc.username,
    location: userdesc.location,
  };
}

/**
 * Updates the location of a user.
 * @param userId
 * @param location
 * @returns
 */
export async function updateUserLocation(userId: UserId, location: UserLocation): Promise<void> {
  const url = `${baseUrl}/uplocation?ID=${decodeURIComponent(userId)}&LOCATION=${decodeURIComponent(
    location
  )}`;
  const response = await fetch(url, {
    method: 'POST',
  });
  return;
}

/**
 * Gets the location of a user.
 * @param userId
 * @returns
 */
export async function getUserLocation(userId: UserId): Promise<UserLocation | null> {
  const url = `${baseUrl}/getLocation?USERID=${decodeURIComponent(userId)}`;
  const response = await fetch(url);
  const res = (await response.json()) as { LOCATION: string }[];
  if (!Array.isArray(res) || res.length < 1) {
    return null;
  }

  return res[0].LOCATION;
}

/**
 * Sends a friend request.
 * @param sender
 * @param receiver
 */
export async function sendFriendRequest(sender: UserId, receiver: UserId): Promise<void> {
  const url = `${baseUrl}/friendReq?FROM=${decodeURIComponent(sender)}&TO=${decodeURIComponent(
    receiver
  )}`;
  await fetch(url, {
    method: 'POST',
  });
}

export interface GetFriendRequestResult {
  from: UserId;
  userName: string;
}

/**
 * Gets friend requests for the given user.
 * @param userId
 */
export async function getFriendRequest(userId: UserId): Promise<GetFriendRequestResult[]> {
  const url = `${baseUrl}/getFriendReq?ID=${decodeURIComponent(userId)}`;
  const response = await fetch(url);
  const result = (await response.json()) as { from: UserId; username: string }[];
  return result.map(el => ({ from: el.from, userName: el.username }));
}

/**
 * Accepts a friend request from user with id `requesterId`.
 * @param userId
 * @param requesterId
 */
export async function acceptFriendRequest(userId: UserId, requesterId: UserId): Promise<void> {
  const url = `${baseUrl}/acceptFriend?ID=${decodeURIComponent(userId)}&FRIEND=${decodeURIComponent(
    requesterId
  )}`;
  await fetch(url);
}
