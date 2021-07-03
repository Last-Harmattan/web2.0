import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import { Post } from './types/public/Post';
import { PostDB } from './types/internal/PostDB';
import { CommentDB } from './types/internal/CommentDb';
import { FindResults } from './types/internal/FindResults';
import { Comment } from './types/public/Comment';
import { DbTypeMapper } from './DbTypeMapper';
import { DbEntryMethaData } from './types/DbEntryMethaData';
import { AllDocumentsInterface } from './types/internal/AllDocumentsInterface';

PouchDB.plugin(find);

export class DBWrapper {
  private db: PouchDB.Database<{}>;

  constructor() {
    this.db = new PouchDB('Web20DB');
  }

  saveNewPost(post: Post): Promise<DbEntryMethaData> {
    post._id = undefined;
    return this.db.post(post).then(function onSuccess(metaData: DbEntryMethaData) {
      return metaData;
    });
  }

  getPostById(id: string): Promise<Post> {
    return this.db.get<PostDB>(id).then((post: PostDB) => {
      return this.getCommentsToPost(id).then((comments: Comment[]) => {
        return DbTypeMapper.mapPost(post, comments);
      });
    });
  }

  getAllPosts(): Promise<Array<Post>> {
    return this.db.find({ selector: { type: 'post' } }).then((result: FindResults) => {
      for (let post of result.docs) {
        this.getCommentsToPost(post._id).then((comments: Comment[]) => {
          post.comments = comments;
        });
      }
      return result.docs;
    });
  }

  addCommentToPost(postId: string, comment: Comment): Promise<DbEntryMethaData> {
    comment._id = undefined;
    let newCommentDb: CommentDB = {
      postId: postId,
      type: 'comment',
      author: comment.author,
      date: 'date',
      content: comment.content,
      likes: comment.likes,
      dislikes: comment.dislikes,
    };

    return this.db.post(newCommentDb);
  }

  getCommentsToPost(postId: string): Promise<Array<Comment>> {
    return this.db
      .find({ selector: { type: 'comment', postId: postId } })
      .then(function onSuccess(result: FindResults) {
        let commentsDb: Array<CommentDB> = result.docs;
        return DbTypeMapper.mapComments(commentsDb);
      });
  }

  updateComment(comment: Comment): Promise<DbEntryMethaData> {
    return this.db.get<CommentDB>(comment._id!).then((commentDb: CommentDB) => {
      commentDb.author = comment.author;
      commentDb.content = comment.content;
      commentDb.date = comment.date;
      commentDb.likes = comment.likes;
      commentDb.dislikes = comment.dislikes;

      return this.db.put(commentDb);
    });
  }

  destroyDatabase() {
    this.db.destroy().then(
      function onSuccess(okStatus) {
        console.log(okStatus);
      },
      function onFailure(error) {
        console.log(error);
      }
    );
  }
}

export function testSaveNewPost(post: Post) {
  console.log('Start store new post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.saveNewPost(post).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function testGetPost(id: string) {
  /*
  console.log('Start get post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.getPostById(id).then(
    function onSuccess(post: Post) {
      console.log(post.author);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
  */

  console.log('Start getllPostTest');
  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.getAllPosts().then(
    function onSuccess(value) {
      console.log(value);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function resetDatabaseTest() {
  let dbWrapper: DBWrapper = new DBWrapper();

  dbWrapper.destroyDatabase();
}
