import { DataConnection } from 'peerjs';
import { Post } from '../database/types/public/Post';
import { PeerJSService } from './PeerJSService';
import { CommunicationType, PostCommunicationData } from './PostRequest';

let peerJSService: PeerJSService = new PeerJSService();
var eventHandler: (foreingPeerID: string, time: string) => Promise<Post[]>;

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

export function addEventHandler(handler: (foreingPeerID: string, time: string) => Promise<Post[]>) {
  eventHandler = handler;
}

export function sendGetNewPostsRequest(
  peerID: string,
  time: string
): Promise<{ connectionSuccess: boolean; time: string; posts: Post[] }> {
  return new Promise((resolve, reject) => {
    let connection = peerJSService.connectToForeignPeer(peerID);

    connection?.on('open', () => {
      connection?.send(getPostsRequestMessage(time));
    });

    connection?.on('error', error => {
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
  eventHandler(connection.peer, request.time).then(posts => {
    let message = getPostResponseMessage(request.time, posts); // TODO: Soll hier die neusete oder die Zeit rein, nach der die Posts gesendet wurden?
    connection.send(message);
  });
}

function handlePostResponse(response: PostCommunicationData): { posts: Post[]; time: string } {
  return { posts: response.posts, time: response.time };
}

/**
 * creates request message for posts after a given timestamp
 * @param time - timestamp of newest known Post
 */
function getPostsRequestMessage(time: string): string {
  let request = new PostCommunicationData(
    CommunicationType.REQUEST_POSTS_AFTER_TIME,
    time,
    new Array<Post>()
  );
  return JSON.stringify(request);
}

/**
 * Creates response message for posts
 * @param time - timestamp of newest know Post
 */
function getPostResponseMessage(time: string, posts: Post[]): string {
  let response = new PostCommunicationData(
    CommunicationType.RESPONSE_POSTS_AFTER_TIME,
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
      authorId: element.authorID,
      date: element.date,
      content: element.content,
      likes: element.likes,
      dislikes: element.dislikes,
      comments: element.comments, // TODO comments korrekt mappen wenn diese verwendet werden.
    };
    posts.push(post);
  });

  return new PostCommunicationData(type, obj.time, posts);
}
