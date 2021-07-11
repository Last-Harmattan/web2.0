import { DataConnection } from 'peerjs';
import { Friend } from '../database/types/public/Friend';
import { Post } from '../database/types/public/Post';
import { UserDatabase } from '../database/UserDatabase';
import { PeerJSService } from './PeerJSService';
import { CommunicationType, PostCommunicationData } from './PostRequest';

let peerJSService: PeerJSService = new PeerJSService();
var connection: DataConnection | null = null;
var connectedToServer: boolean = false;
var connectedtoforeignPeer: boolean = false;
var userDB = new UserDatabase();
var friendList: Friend[];
var currentFetchingFriendPeerID: string | null = null;

export function init() {
  peerJSService.openNewPeer(onPeerOpened, onPeerDisconnected, onConnected);
}

export function updatePosts() {
  userDB.getAllFriends().then(onUpdateFriendList);
}

function onUpdateFriendList(friends: Friend[] | null) {
  if (friends != null) {
    friendList = friends;
    updatePostsOfFriend(0);
  }
}

function updatePostsOfFriend(pos: number) {
  let friend = friendList[pos];
  let friendPeerID = 'API call für die PeerID von friend.userName'; // TODO: API call
  connectToPeer(friendPeerID);
}

export function connectToPeer(id: string) {
  if (!connectedToServer) {
    console.log('Not connected to a Server!');
    return;
  }
  onConnected(peerJSService.connectToForeignPeer(id));
}

function onPeerOpened(id: string) {
  connectedToServer = true;
  console.log('Opened Peer with id: ', id);
}

function onPeerDisconnected() {
  // TODO: Reconnect
  connectedToServer = false;
}

function onConnected(newConnection?: DataConnection) {
  if (newConnection == null || connectedtoforeignPeer) {
    console.log('Connection refused');
    newConnection?.close();
    return;
  }

  connection = newConnection;
  console.log('connected to foreingn peer: ', connection.peer);
  connection.on('open', onReadyToSendData);
  connection.on('data', onMessageReceived);
  connection.on('close', onConnectionClosed);
  connection.on('error', onConnectionError);
}

function onReadyToSendData() {
  console.log('Ready to send Data!');
  connectedtoforeignPeer = true;

  if (currentFetchingFriendPeerID == connection?.peer) {
    let msg = getCurrentPostTimestampRequestMessage();
    connection?.send(msg);
  }
}

function onMessageReceived(data: string) {
  console.log('Received Message: ', data);
  let responseData = mapJSONResponseToPostCommunicationData(data);
  console.log(responseData);
  handleResponseData(
    responseData,
    handleTimeResponse,
    handlePostResponse,
    handleTimeRequest,
    handlePostRequest
  );
}

function onConnectionClosed() {
  connectedtoforeignPeer = false;
  connection = null;
}

function onConnectionError(error: any) {
  console.log(error);
  connectedtoforeignPeer = false;
  connection = null;
}

function handleTimeResponse(response: PostCommunicationData) {
  // TODO: check if Time is newer than last known one and request new Posts if so, else disconnect
}

function handlePostResponse(response: PostCommunicationData) {
  // TODO: insert new Posts into database an update UI and disconnect
}

function handleTimeRequest() {
  // TODO: send the most current Time to current connected Peer
}

function handlePostRequest(response: PostCommunicationData) {
  // TODO: send new Posts after given Timestamp to connected Peer and disconnect
}

/**
 * creates request message for the latest post timestamp
 */
function getCurrentPostTimestampRequestMessage(): string {
  let sender: string = 'Hier steht die Sender ID'; // TODO: ID des Senders (eigene unique ID) aus Datenbank holen
  let request = new PostCommunicationData(CommunicationType.GET_CURRENT_POST_TIME, sender);
  return JSON.stringify(request);
}

/**
 * creates request message for posts after a given timestamp
 * @param time - timestamp of newest known Post
 */
function getPostsRequestMessage(time: string): string {
  let request = new PostCommunicationData(CommunicationType.GET_POSTS_AFTER_TIME, time);
  return JSON.stringify(request);
}

/**
 * Creates response message for timestamp
 */
function getCurrentTimestampResponseMessage(): string {
  let time: string = 'Timestamp from Database'; // TODO: Datenbankcall für Timestamp
  let response = new PostCommunicationData(
    CommunicationType.RESPONSE_CURRENT_POST_TIME,
    time,
    null
  );
  return JSON.stringify(response);
}

/**
 * Creates response message for posts
 * @param time - timestamp of newest know Post
 */
function getPostResponseMessage(time: string) {
  let posts: Post[] = []; // TODO: Datenbankcall für die Posts muss hier hin
  let sender: string = 'Hier steht die Sender ID'; // TODO: ID des Senders (eigene unique ID) aus Datenbank holen
  let response = new PostCommunicationData(
    CommunicationType.RESPONSE_POSTS_AFTER_TIME,
    sender,
    null,
    posts
  );
  let jsonResponse = JSON.stringify(response);
}

function mapJSONResponseToPostCommunicationData(json: string): PostCommunicationData {
  let obj = JSON.parse(json);
  let type: CommunicationType = CommunicationType[obj.type as keyof typeof CommunicationType];
  return new PostCommunicationData(type, obj.sender, obj.time, obj.posts); // TODO: korrektes mapping auf posts
}

/**
 * handles the data received from another Peer and does simple routing depending on the type of Communication
 * @param response - data received from the Response of another Peer
 */
function handleResponseData(
  response: PostCommunicationData,
  handleTimeResponse: (response: PostCommunicationData) => void,
  handlePostResponse: (response: PostCommunicationData) => void,
  handleTimeRequest: () => void,
  handlePostRequest: (response: PostCommunicationData) => void
) {
  switch (response.type) {
    case CommunicationType.RESPONSE_CURRENT_POST_TIME: {
      handleTimeResponse(response);
      break;
    }
    case CommunicationType.RESPONSE_POSTS_AFTER_TIME: {
      handlePostResponse(response);
      break;
    }
    case CommunicationType.GET_CURRENT_POST_TIME: {
      handleTimeRequest();
      break;
    }
    case CommunicationType.GET_POSTS_AFTER_TIME: {
      handlePostRequest(response);
      break;
    }
    default: {
      console.log('Invalid Communication Type!');
    }
  }
}
