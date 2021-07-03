import { PostDB } from './types/internal/PostDB';
import { Post } from './types/public/Post';
import { Comment } from './types/public/Comment';
import { CommentDB } from './types/internal/CommentDb';

export class DbTypeMapper {
  static mapPost(postDb: PostDB, comments: Comment[]): Post {
    return {
      _id: postDb._id,
      author: postDb.author,
      date: postDb.date,
      content: postDb.content,
      likes: postDb.likes,
      dislikes: postDb.dislikes,
      comments: comments,
    };
  }

  static mapComment(commentDb: CommentDB): Comment {
    return {
      _id: commentDb._id,
      postId: commentDb.postId,
      author: commentDb.author,
      date: commentDb.date,
      content: commentDb.content,
      likes: commentDb.likes,
      dislikes: commentDb.dislikes,
    };
  }
}
