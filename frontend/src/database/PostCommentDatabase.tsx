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

export function test() {
  let button = document.getElementById('test');

  if (button) {
    button.onclick = function () {
      let post: Post = new Post(
        '1',
        'Thomas',
        '01.01.2021, 11:59:42',
        'Diest ist der Content des Posts',
        420,
        69,
        []
      );
      let dbWrapper: DBWrapper = new DBWrapper();

      dbWrapper.savePost(post);
    };
  }
}
