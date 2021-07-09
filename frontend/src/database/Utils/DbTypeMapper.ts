import { PostDB } from '../types/internal/PostDB';
import { Post } from '../types/public/Post';
import { Comment } from '../types/public/Comment';
import { CommentDB } from '../types/internal/CommentDb';
import { SortingUtils } from './SortingUtils';

export class DbTypeMapper {
  static mapPost(postDb: PostDB, comments: Comment[]): Post {
    SortingUtils.sortByIso8061Date(comments);
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
      author: commentDb.author,
      date: commentDb.date,
      content: commentDb.content,
      likes: commentDb.likes,
      dislikes: commentDb.dislikes,
    };
  }

  static mapComments(commentsDb: Array<CommentDB>): Comment[] {
    let comments: Array<Comment> = commentsDb.map(this.mapComment);
    SortingUtils.sortByIso8061Date(comments);

    return comments;
  }
}
