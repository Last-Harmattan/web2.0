import { Post } from '../database/types/public/Post';
import { PeerJSService } from './PeerJSService';
import { CommunicationType, PostCommunicationData } from './PostRequest';

/**
 * @class PostService - Service for requesting and sending data associated with Posts
 * @member peerJSService - Service handling the PeerJS logic
 * @member connected - Boolean telling if Service is connected to another peer
 * @member onTimeReceived - function reference, called when most current time is available
 * @member onPostsReceived - function reference, called when new Posts are availabel and stored in the Database
 * @member onPeerOpened - function reference, called when new peer ist opened and PeerJS-ID is available
 */
export class PostService {
  private peerJSService: PeerJSService = new PeerJSService();
  connected: boolean = false;

  onTimeReceived: ((time: string) => void) | null = null;
  onPostsReceived: (() => void) | null = null;
  onPeerOpened: ((id: string) => void) | null = null;

  constructor() {
    this.peerJSService.onMessageReceived = this.onMessageReceived;
    this.peerJSService.onConnected = this.onConnected;
    this.peerJSService.onPeerOpened = this.onPeerOpened;
    this.peerJSService.openPeer();
  }

  /**
   * Establishes the connection to another Peer
   * @param id - PeerJS-ID of another Peer
   */
  public connectToPeer(id: string) {
    this.peerJSService.connectToPeer(id);
  }

  /**
   * Requests most current Post timestamp from connected Peer
   */
  public getLatestPostTimestamp() {
    if (this.connected) {
      let request = new PostCommunicationData(CommunicationType.GET_CURRENT_POST_TIME);
      let jsonRequest = JSON.stringify(request);
      this.peerJSService.sendMessage(jsonRequest);
      console.log('sent message to Peer: ', jsonRequest);
    }
  }

  /**
   * Requests all new Post after timestamp from connected Peer
   * @param time - timestamp of newest known Post
   */
  public getPosts(time: string) {
    if (this.connected) {
      let request = new PostCommunicationData(CommunicationType.GET_POSTS_AFTER_TIME, time);
      let jsonRequest = JSON.stringify(request);
      this.peerJSService.sendMessage(jsonRequest);
      console.log('sent message to Peer: ', jsonRequest);
    }
  }

  /**
   * Sends the current Timestamp to connected Peer
   */
  public sendCurrentTimestamp() {
    if (this.connected) {
      let time: string = 'Timestamp from Database'; // TODO: Datenbankcall für Timestamp
      let response = new PostCommunicationData(
        CommunicationType.RESPONSE_CURRENT_POST_TIME,
        time,
        null
      );
      let jsonResponse = JSON.stringify(response);
      this.peerJSService.sendMessage(jsonResponse);
      console.log('sent message to Peer: ', jsonResponse);
    }
  }

  /**
   * Sends new Posts to connected Peers
   * @param time - timestamp of newest know Post
   */
  public sendPostsAfterTime(time: string) {
    if (this.connected) {
      let posts: Post[] = []; // TODO: Datenbankcall für die Posts muss hier hin
      let response = new PostCommunicationData(
        CommunicationType.RESPONSE_POSTS_AFTER_TIME,
        null,
        posts
      );
      let jsonResponse = JSON.stringify(response);
      this.peerJSService.sendMessage(jsonResponse);
      console.log('sent message to Peer: ', jsonResponse);
    }
  }

  /**
   * updated the connection status of this service
   * @param connected - Boolean representing if connection is established
   */
  private onConnected(connected: boolean) {
    this.connected = connected;
  }

  /**
   * called when receiving a message from another peer
   * @param data - string message received from another Peer
   */
  private onMessageReceived(data: string) {
    console.log('received message from Peer: ', data);
    let response: PostCommunicationData = JSON.parse(data);
    this.handleResponseData(response);
  }

  // TODO: good practice would be just passing the responsedata into a callback function and implementing the handling and logic in another script or class

  /**
   * handles the data received from another Peer and does simple routing depending on the type of Communication
   * @param response - data received from the Response of another Peer
   */
  private handleResponseData(response: PostCommunicationData) {
    switch (response.type) {
      case CommunicationType.RESPONSE_CURRENT_POST_TIME: {
        this.handleTimeResponse(response);
        break;
      }
      case CommunicationType.RESPONSE_POSTS_AFTER_TIME: {
        this.handlePostResponse(response);
        break;
      }
      case CommunicationType.GET_CURRENT_POST_TIME: {
        this.handleTimeRequest();
        break;
      }
      case CommunicationType.GET_POSTS_AFTER_TIME: {
        this.handlePostRequest(response);
        break;
      }
      default: {
        console.log('Invalid Communication Type!');
      }
    }
  }

  /**
   * handles the response of the most current post-timestamp
   * @param response - data received from the Response of another Peer
   */
  private handleTimeResponse(response: PostCommunicationData) {
    this.onTimeReceived?.(response.time!!);
  }

  /**
   * handles the reponse of new Posts
   * @param response - data received from the Response of another Peer
   */
  private handlePostResponse(response: PostCommunicationData) {
    // TODO: Put Posts into DB
    this.onPostsReceived?.();
  }

  /**
   * handles the request for the most current post-timestamp
   */
  private handleTimeRequest() {
    this.sendCurrentTimestamp();
  }

  /**
   * handles the request for new Posts
   * @param request - data containing the newest know timestamp
   */
  private handlePostRequest(request: PostCommunicationData) {
    this.sendPostsAfterTime(request.time!!);
  }
}
