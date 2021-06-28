import PouchDB from 'pouchdb-browser';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { Post } from './types/Post';

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
  }

  savePost(post: Post) {
    this.relationalDB.rel.save('post', post).then(
      function onSuccess(idAndRevision) {
        console.log(idAndRevision);
      },
      function onError(error) {
        console.log(error);
      }
    );
  }

  getAllPosts() {
    this.relationalDB.rel.find('post').then(
      function onSuccess(posts) {
        console.log(posts);
      },
      function onError(error) {
        console.log(error);
      }
    );
  }

  getPostById(id: String) {
    this.relationalDB.rel.find('post', id).then(
      function onSuccess(post) {
        console.log(post);
      },
      function onError(error) {
        console.log(error);
      }
    );
  }

  updatePost(post: Post) {
    this.relationalDB.rel.save('post', post).then(
      function onSucces(value) {
        console.log(value);
      },
      function onError(error) {
        console.log(error);
      }
    );
  }
}

export function testSaveNewPost(post: Post) {
  console.log('Start store new post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.savePost(post);
  dbWrapper.getPostById(post.id);
}

export function testGetPost(id: String) {
  console.log('Start get post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.getPostById(id);
}
