import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { Post } from './types/Post';
import { DbEntryMethaData } from './types/DbEntryMethaData';

PouchDB.plugin(find).plugin(rel);

export class DBWrapper {
  private vanillaDB: PouchDB.Database<{}>;
  private relationalDB: PouchDB.RelDatabase;

  constructor() {
    this.vanillaDB = new PouchDB('Web20DB');
    console.log(this.vanillaDB.info());
    this.relationalDB = this.vanillaDB.setSchema([
      {
        singular: 'post',
        plural: 'posts',
        relations: {
          comments: { hasMany: 'comment' },
        },
      },
      {
        singular: 'comment',
        plural: 'comments',
        relations: {
          post: { belongsTo: 'post' },
        },
      },
    ]);

    this.vanillaDB.createIndex({ index: { fields: ['data.post', '_id'] } });
  }

  saveOrUpdatePost(post: Post): Promise<DbEntryMethaData> {
    return this.relationalDB.rel.save('post', post);
  }

  getAllPosts(): Promise<Array<Post>> {
    return this.relationalDB.rel.find('post').then(function onSuccess(posts) {
      return posts.posts;
    });
  }

  getPostById(id: String): Promise<Post> {
    return this.relationalDB.rel.find('post', id).then(function onSuccess(post: any) {
      return post.posts[0];
    });
  }

  addCommentToPost(postID: String, comment: Comment) {}
}

export function testSaveNewPost(post: Post) {
  console.log('Start store new post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.saveOrUpdatePost(post);
  dbWrapper.getPostById(post.id);
}

export function testGetPost(id: String) {
  console.log('Start get post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.getPostById(id).then(
    function onSuccess(post: Post) {
      console.log(post);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}
