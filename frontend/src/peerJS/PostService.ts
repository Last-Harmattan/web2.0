import { Post } from '../database/types/public/Post';
import { PeerJSService } from './PeerJSService';
import { CommunicationType, PostCommunicationData } from './PostRequest';

/**
 * Establishes the connection to another Peer
 * @param id - PeerJS-ID of another Peer
 */
export function connectToPeer(peerJSService: PeerJSService, id: string) {
  peerJSService.connectToPeer(id);
}

/**
 * Requests most current Post timestamp from connected Peer
 */
export function getLatestPostTimestamp(peerJSService: PeerJSService) {
  if (peerJSService.isConnected()) {
    let request = new PostCommunicationData(CommunicationType.GET_CURRENT_POST_TIME);
    let jsonRequest = JSON.stringify(request);
    peerJSService.sendMessage(jsonRequest);
    console.log('sent message to Peer: ', jsonRequest);
  }
}

/**
 * Requests all new Post after timestamp from connected Peer
 * @param time - timestamp of newest known Post
 */
export function getPosts(peerJSService: PeerJSService, time: string) {
  if (peerJSService.isConnected()) {
    let request = new PostCommunicationData(CommunicationType.GET_POSTS_AFTER_TIME, time);
    let jsonRequest = JSON.stringify(request);
    peerJSService.sendMessage(jsonRequest);
    console.log('sent message to Peer: ', jsonRequest);
  }
}

/**
 * Sends the current Timestamp to connected Peer
 */
export function sendCurrentTimestamp(peerJSService: PeerJSService) {
  if (peerJSService.isConnected()) {
    let time: string = 'Timestamp from Database'; // TODO: Datenbankcall für Timestamp
    let response = new PostCommunicationData(
      CommunicationType.RESPONSE_CURRENT_POST_TIME,
      time,
      null
    );
    let jsonResponse = JSON.stringify(response);
    peerJSService.sendMessage(jsonResponse);
    console.log('sent message to Peer: ', jsonResponse);
  }
}

/**
 * Sends new Posts to connected Peers
 * @param time - timestamp of newest know Post
 */
export function sendPostsAfterTime(peerJSService: PeerJSService, time: string) {
  if (peerJSService.isConnected()) {
    let posts: Post[] = []; // TODO: Datenbankcall für die Posts muss hier hin
    let response = new PostCommunicationData(
      CommunicationType.RESPONSE_POSTS_AFTER_TIME,
      null,
      posts
    );
    let jsonResponse = JSON.stringify(response);
    peerJSService.sendMessage(jsonResponse);
    console.log('sent message to Peer: ', jsonResponse);
  }
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
