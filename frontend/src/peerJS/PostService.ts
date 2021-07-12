import { DataConnection } from 'peerjs';
import { UserId } from '../api/backend';
import { Post } from '../database/types/public/Post';
import { PeerJSService } from './PeerJSService';
import { CommunicationType, PostCommunicationData } from './PostRequest';

let peerJSService: PeerJSService = new PeerJSService();
var eventHandler: (requesterUserId: UserId, foreingPeerID: string, time: string) => Promise<Post[]>;

export function openPeer(): Promise<string> {
  return new Promise((resolve, reject) => {
    peerJSService.openNewPeer(
      (id: string) => {
        resolve(id);
      },
      () => {
        reject();
      },
      onForeignConnection
    );
  });
}

function onForeignConnection(connection: DataConnection) {
  connection.on('data', (data: string) => {
    onMessageReceived(connection, data);
  });
}

export function addEventHandler(
  handler: (requesterUserId: UserId, foreingPeerID: string, time: string) => Promise<Post[]>
) {
  eventHandler = handler;
}

/**
 *
 * @param userId User ID of the sender (aka me)
 * @param peerID
 * @param time
 * @returns
 */
export function sendGetNewPostsRequest(
  userId: string,
  peerID: string,
  time: string
): Promise<{ connectionSuccess: boolean; time: string; posts: Post[] }> {
  return new Promise((resolve, reject) => {
    let connection = peerJSService.connectToForeignPeer(peerID);

    connection?.on('open', () => {
      connection?.send(getPostsRequestMessage(userId, time));
    });

    connection?.on('error', error => {
      console.log('connectToForeignPeer error', error);
      reject(error);
    });

    connection?.on('close', () => {
      reject('ConnectionClosed');
    });

    connection?.on('data', (data: string) => {
      let messageData = onMessageReceived(connection!!, data);
      resolve({ connectionSuccess: true, time: messageData.time, posts: messageData.posts });
    });
  });
}

function onMessageReceived(
  connection: DataConnection,
  data: string
): { posts: Post[]; time: string } {
  console.log('Received Message: ', data);
  let responseData = mapJSONResponseToPostCommunicationData(data);
  console.log(responseData);
  return handleResponseData(responseData, connection);
}

/**
 * handles the data received from another Peer and does simple routing depending on the type of Communication
 * @param response - data received from the Response of another Peer
 */
function handleResponseData(
  response: PostCommunicationData,
  connection: DataConnection
): { posts: Post[]; time: string } {
  switch (response.type) {
    case CommunicationType.RESPONSE_POSTS_AFTER_TIME: {
      return handlePostResponse(response);
    }
    case CommunicationType.REQUEST_POSTS_AFTER_TIME: {
      handlePostRequest(response, connection);
      return { posts: new Array<Post>(), time: response.time };
    }
    default: {
      console.log('Invalid Communication Type!');
      return { posts: new Array<Post>(), time: response.time };
    }
  }
}

function handlePostRequest(request: PostCommunicationData, connection: DataConnection) {
  eventHandler(request.requesterUserId, connection.peer, request.time).then(posts => {
    let message = getPostResponseMessage(request.requesterUserId, new Date().toISOString(), posts);
    connection.send(message);
  });
}

function handlePostResponse(response: PostCommunicationData): {
  requesterUserId: UserId;
  posts: Post[];
  time: string;
} {
  return { requesterUserId: response.requesterUserId, posts: response.posts, time: response.time };
}

/**
 * creates request message for posts after a given timestamp
 * @param time - timestamp of newest known Post
 */
function getPostsRequestMessage(requesterUserId: string, time: string): string {
  let request = new PostCommunicationData(
    CommunicationType.REQUEST_POSTS_AFTER_TIME,
    requesterUserId,
    time,
    new Array<Post>()
  );
  return JSON.stringify(request);
}

/**
 * Creates response message for posts
 * @param time - timestamp of newest know Post
 */
function getPostResponseMessage(requesterUserId: UserId, time: string, posts: Post[]): string {
  let response = new PostCommunicationData(
    CommunicationType.RESPONSE_POSTS_AFTER_TIME,
    requesterUserId,
    time,
    posts
  );
  return JSON.stringify(response);
}

function mapJSONResponseToPostCommunicationData(json: string): PostCommunicationData {
  let obj = JSON.parse(json);
  let type: CommunicationType = CommunicationType[obj.type as keyof typeof CommunicationType];
  let posts = new Array<Post>();

  obj.posts.forEach((element: any) => {
    let post: Post = {
      _id: element._id,
      authorId: element.authorId,
      date: element.date,
      content: element.content,
      likes: element.likes,
      dislikes: element.dislikes,
      comments: element.comments, // TODO comments korrekt mappen wenn diese verwendet werden.
    };
    posts.push(post);
  });

  return new PostCommunicationData(type, obj.requesterUserId, obj.time, posts);
}
