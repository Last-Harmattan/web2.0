import { Post } from '../database/types/public/Post';
import { CommunicationType, PostCommunicationData } from './PostRequest';

/**
 * creates request message for the latest post timestamp
 */
export function getCurrentPostTimestampRequestMessage(): string {
  let sender: string = 'Hier steht die Sender ID'; // TODO: ID des Senders (eigene unique ID) aus Datenbank holen
  let request = new PostCommunicationData(CommunicationType.GET_CURRENT_POST_TIME, sender);
  return JSON.stringify(request);
}

/**
 * creates request message for posts after a given timestamp
 * @param time - timestamp of newest known Post
 */
export function getPostsRequestMessage(time: string): string {
  let request = new PostCommunicationData(CommunicationType.GET_POSTS_AFTER_TIME, time);
  return JSON.stringify(request);
}

/**
 * Creates response message for timestamp
 */
export function getCurrentTimestampResponseMessage(): string {
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
export function getPostResponseMessage(time: string) {
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

export function mapJSONResponseToPostCommunicationData(json: string): PostCommunicationData {
  let obj = JSON.parse(json);
  let type: CommunicationType = CommunicationType[obj.type as keyof typeof CommunicationType];
  return new PostCommunicationData(type, obj.time, obj.posts); // TODO: korrektes mapping auf posts
}

/**
 * handles the data received from another Peer and does simple routing depending on the type of Communication
 * @param response - data received from the Response of another Peer
 */
export function handleResponseData(
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
