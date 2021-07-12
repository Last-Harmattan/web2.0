import { UserId } from '../api/backend';
import { Post } from '../database/types/public/Post';

/**
 * @enum CommunicationType
 * {@link #GET_CURRENT_POST_TIME}
 * {@link #GET_POSTS_AFTER_TIME}
 * {@link #RESPONSE_CURRENT_POST_TIME}
 * {@link #RESPONSE_POSTS_AFTER_TIME}
 */
export enum CommunicationType { // Attention: Value hast to be the same as the key for the mapper to work
  /** Request for Posts after Timestamp */
  REQUEST_POSTS_AFTER_TIME = 'REQUEST_POSTS_AFTER_TIME',
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
  requesterUserId: UserId;
  time: string;
  posts: Post[];

  constructor(type: CommunicationType, requesterUserId: UserId, time: string, posts: Post[]) {
    this.type = type;
    this.requesterUserId = requesterUserId;
    this.time = time;
    this.posts = posts;
  }
}
