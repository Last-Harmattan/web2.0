import Pouch from 'pouchdb-core';
import find from 'pouchdb-find';
import rel from 'relational-pouch';
import { Post } from './types/Post';

Pouch.plugin(find).plugin(rel);

export class DBWrapper {
  private vanillaDB: PouchDB.Database;
  private relationalDB: PouchDB.RelDatabase;

  constructor() {
    this.vanillaDB = new Pouch('Web20DB');
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

  getPostById(id: string) {
    this.relationalDB.rel.find('post', id).then(
      function onSuccess(post) {
        console.log(post);
      },
      function onError(error) {
        console.log(error);
      }
    );
  }
}
