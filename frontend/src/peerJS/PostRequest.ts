import { Post } from '../database/types/public/Post';

/**
 * @enum CommunicationType
 * {@link #GET_CURRENT_POST_TIME}
 * {@link #GET_POSTS_AFTER_TIME}
 * {@link #RESPONSE_CURRENT_POST_TIME}
 * {@link #RESPONSE_POSTS_AFTER_TIME}
 */
export enum CommunicationType {
  /** Request for Timestamp of most current Post */
  GET_CURRENT_POST_TIME = 'GET_CURRENT_POST_TIME',
  /** Request for Posts after Timestamp */
  GET_POSTS_AFTER_TIME = 'GET_POSTS_AFTER_TIME',
  /** Response of the most current Timestamp */
  RESPONSE_CURRENT_POST_TIME = 'RESPONSE_CURRENT_POST_TIME',
  /** Response of Posts after Timestamp */
  RESPONSE_POSTS_AFTER_TIME = 'RESPONSE_POSTS_AFTER_TIME',
}

/**
 * @class PostCommunicationData - Dataclass representing the simple P2P Communication for exchanging Posts
 * @member type - Type of the Communication {@link CommunicationType}
 * @member time - Timestamp of most current Post or for requesting Post depending on the {@link type}
 * @member posts - list of Posts for the Response
 */
export class PostCommunicationData {
  type: CommunicationType;
  sender: string;
  time: string | null;
  posts: Post[] | null;

  constructor(
    type: CommunicationType,
    sender: string,
    time: string | null = null,
    posts: Post[] | null = null
  ) {
    this.type = type;
    this.sender = sender;
    this.time = time;
    this.posts = posts;
  }
}
