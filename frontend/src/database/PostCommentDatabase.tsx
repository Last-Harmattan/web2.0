import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import { Post } from './types/public/Post';
import { PostDB } from './types/internal/PostDB';
import { CommentDB } from './types/internal/CommentDb';
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
    post._id = 'post' + post._id;
    return this.db.put(post).then(function onSuccess(metaData: DbEntryMethaData) {
      return metaData;
    });
  }

  getPostById(id: string): Promise<Post> {
    return this.db.get<PostDB>(id).then((post: PostDB) => {
      return this.getCommentsToPost(post._id).then((comments: Comment[]) => {
        return DbTypeMapper.mapPost(post, comments);
      });
    });
  }

  getAllPosts(): Promise<Array<Post>> {
    return this.db
      .allDocs({ startkey: 'post', endkey: 'post\ufff0', include_docs: true })
      .then(function onSuccess(data: AllDocumentsInterface) {
        var posts: Array<Post> = new Array<Post>();
        for (let row of data.rows) {
          posts.push(row.doc);
        }
        return posts;
      });
  }

  addCommentToPost(postId: string, comment: Comment) {
    return this.db.get<Post>(postId).then((post: Post) => {
      post.comments.push(comment);
      return this.db.put(post);
    });
  }

  getCommentsToPost(postId: string): Promise<Array<Comment>> {
    return this.db
      .allDocs({ startkey: 'comment', endkey: 'comment\ufff0', include_docs: true })
      .then(function onSuccess(data: AllDocumentsInterface) {
        var comments: Array<Comment> = new Array<Comment>();
        for (let row of data.rows) {
          let doc = row.doc;
          comments.push(DbTypeMapper.mapComment(doc));
        }
        return comments;
      });
  }

  updateComment(comment: Comment): Promise<DbEntryMethaData> {
    return this.db.get<Post>(comment.postId).then((post: Post) => {
      for (let comm of post.comments) {
        if (comment._id == comm._id) {
          comm == comment;
          break;
        }
      }
      return this.db.put(post);
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
