import PouchDB from 'pouchdb-browser';
import { Post } from './types/Post';
import { DbEntryMethaData } from './types/DbEntryMethaData';
import { AllDocumentsInterface, Row } from './types/internal/AllDocumentsInterface';

export class DBWrapper {
  private db: PouchDB.Database<{}>;

  constructor() {
    this.db = new PouchDB('Web20DB');
  }

  savePost(post: Post): Promise<DbEntryMethaData> {
    post._id = 'post' + post._id;
    return this.db.put(post).then(
      function onSuccess(metaData: DbEntryMethaData) {
        return metaData;
      },
      function onFailure(error: any) {
        return error;
      }
    );
  }

  getPostById(id: string): Promise<Post> {
    return this.db.get(id).then(
      function onSuccess(post) {
        return post;
      },
      function onFailure(error: any) {
        return error;
      }
    );
  }

  getAllPosts(): Promise<Array<Post>> {
    return this.db.allDocs({ startkey: 'post', endkey: 'post\ufff0', include_docs: true }).then(
      function onSuccess(data: AllDocumentsInterface) {
        var posts: Array<Post> = new Array<Post>();
        for (let row of data.rows) {
          posts.push(row.doc);
        }
        return posts;
      },
      function onFailure(error: any) {
        return error;
      }
    );
  }

  addCommentToPost(postId: String, comment: Comment) {}

  destroyDatabase() {
    this.db.destroy().then(
      function onSuccess(value) {
        console.log(value);
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
  dbWrapper.savePost(post).then(
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
