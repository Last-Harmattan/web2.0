import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import { DbTypeMapper } from './Utils/DbTypeMapper';
import { CommentDB } from './types/internal/CommentDb';
import { DbEntryMethaData } from './types/internal/DbEntryMethaData';
import { PostDB } from './types/internal/PostDB';
import { Comment } from './types/public/Comment';
import { Post } from './types/public/Post';

PouchDB.plugin(find);

/**
 * @class
 *
 * This database service is a wrapper that is responsible for
 * storing, updating and deleting posts and comments on the
 * local database
 *
 * @member db - PoiuchDb database object
 *
 **/
export class CommentDBWrapper {
  private db: PouchDB.Database<PostDB | CommentDB>;

  constructor() {
    this.db = new PouchDB('Web20DB');
  }

  /**
   * Stores the passed post object and its containing comment objects in the database.
   * Returns a promise of a list where an entry can be a MetaDataObject or an error
   * The Ids that are returned are the Ids that are assingend to the post and the comments
   * in the database.
   * On the first place of the Array is the result for the post. The following
   * entires are in the same order the comments were in the post object.
   * Set these Ids in the post and comment objects that are originally passed to
   * the function on your side!
   * Ids are required for editing and deletion of objects in the database.
   *
   * @param post - Post that shall be stored in the database.
   * @returns {Promise<(DbEntryMethaData | PouchDB.Core.Error)[]>}
   */
  saveNewPost(post: Post): Promise<(DbEntryMethaData | PouchDB.Core.Error)[]> {
    post.comments = [];
    const postDb: PostDB = {
      type: 'post',
      author: post.author,
      date: post.date,
      content: post.content,
      likes: post.likes,
      dislikes: post.dislikes,
    };

    return this.db.post(postDb).then(metaData => {
      const commentsDb: CommentDB[] = [];
      for (const comment of post.comments) {
        const commentDb: CommentDB = {
          type: 'comment',
          postId: metaData.id,
          date: comment.date,
          author: comment.author,
          content: comment.content,
          likes: comment.likes,
          dislikes: comment.dislikes,
        };
        commentsDb.push(commentDb);
      }
      return this.db.bulkDocs(commentsDb).then(value => {
        value.unshift(metaData);

        return value;
      });
    });
  }

  /**
   * Delete the post with the given Id. Deletes also its comments
   * Returns a Promise of a list where an entry is either a DbEntryMetadata object
   * or an error. Check the results to see if the post and the comments
   * are deleted correctly.
   *
   * @param postId - Id of the post that shall be deleted.
   * @returns {Promise<(DbEntryMethaData | PouchDB.Core.Error)[]>}
   */
  deletePost(postId: string): Promise<(DbEntryMethaData | PouchDB.Core.Error)[]> {
    return this.db.find({ selector: { type: 'comment', postId: postId } }).then(result => {
      for (const comment of result.docs) {
        comment._deleted = true;
      }
      return this.db.bulkDocs(result.docs).then(commentsDeleteResult => {
        return this.db.get(postId).then(postDb => {
          return this.db.remove({ _id: postDb._id!, _rev: postDb._rev! }).then(postDeleteResult => {
            commentsDeleteResult.unshift(postDeleteResult);
            return commentsDeleteResult;
          });
        });
      });
    });
  }

  updatePost(post: Post): Promise<DbEntryMethaData> {
    return this.db.get(post._id!).then((postDb: PostDB) => {
      postDb.author = post.author;
      postDb.content = post.content;
      postDb.date = post.date;
      postDb.likes = post.likes;
      postDb.dislikes = post.dislikes;
      return this.db.put(postDb);
    });
  }

  getPostById(id: string): Promise<Post> {
    return this.db.get(id).then(post => {
      return this.getCommentsToPost(id).then(comments => DbTypeMapper.mapPost(post, comments));
    });
  }

  getAllPosts(): Promise<Post[]> {
    return this.db.find({ selector: { type: 'post' } }).then(result =>
      // For each post (of type PostDB) load his comments (of type Comment[]).
      // When the inner promise to load the comments resolves, put them together into one Post
      // object.
      Promise.all(
        result.docs.map(post =>
          this.getCommentsToPost(post._id).then(comments => DbTypeMapper.mapPost(post, comments))
        )
      )
    );
  }

  addCommentToPost(postId: string, comment: Comment): Promise<DbEntryMethaData> {
    comment._id = undefined;
    const newCommentDb: CommentDB = {
      postId: postId,
      type: 'comment',
      author: comment.author,
      date: comment.date,
      content: comment.content,
      likes: comment.likes,
      dislikes: comment.dislikes,
    };

    return this.db.post(newCommentDb);
  }

  getCommentsToPost(postId: string): Promise<Comment[]> {
    return this.db.find({ selector: { type: 'comment', postId: postId } }).then(result => {
      // We can imply that we actually get CommentDB objects here since we queried for docs
      // with a specific value for postId.
      const commentsDb = result.docs as CommentDB[];
      return DbTypeMapper.mapComments(commentsDb);
    });
  }

  updateComment(comment: Comment): Promise<DbEntryMethaData> {
    return this.db.get(comment._id!).then(commentDb => {
      commentDb.author = comment.author;
      commentDb.content = comment.content;
      commentDb.date = comment.date;
      commentDb.likes = comment.likes;
      commentDb.dislikes = comment.dislikes;

      return this.db.put(commentDb);
    });
  }

  deleteComment(commentId: string): Promise<any> {
    return this.db.get<CommentDB>(commentId).then((comment: CommentDB) => {
      return this.db.remove({ _id: comment._id!, _rev: comment._rev! });
    });
  }

  showCompleteDatabaseContent(): Promise<any> {
    return this.db.allDocs({ include_docs: true });
  }

  //Only for developement testing
  destroyDatabase(): Promise<any> {
    return this.db.destroy();
  }
}
