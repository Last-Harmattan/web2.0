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
      authorId: postDb.authorId,
      date: postDb.date,
      content: postDb.content,
      likes: postDb.likes,
      dislikes: postDb.dislikes,
      comments: comments,
    };
  }

  static mapPosts(postsDb: PostDB[]): Post[] {
    let posts: Post[] = postsDb.map(post => this.mapPost(post, []));
    SortingUtils.sortByIso8061Date(posts);

    return posts;
  }

  static mapComment(commentDb: CommentDB): Comment {
    return {
      _id: commentDb._id,
      authorId: commentDb.authorId,
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
