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

  saveNewPost(post: Post): Promise<any> {
    post._id = undefined;
    let postDb: PostDB = {
      type: 'post',
      author: post.author,
      date: post.date,
      content: post.content,
      likes: post.likes,
      dislikes: post.dislikes,
    };

    return this.db.post(postDb).then((metaData: DbEntryMethaData) => {
      let commentsDb: Array<CommentDB> = new Array<CommentDB>();
      for (let comment of post.comments) {
        let commentDb: CommentDB = {
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
      return this.db.bulkDocs(commentsDb);
    });
  }

  deletePost(postId: string): Promise<any> {
    return this.db
      .find({ selector: { type: 'comment', postId: postId } })
      .then((result: FindResults) => {
        for (let comment of result.docs) {
          comment._deleted = true;
        }
        this.db.bulkDocs(result.docs).then(deleteResult => {
          this.db.get<PostDB>(postId).then(postDb => {
            return this.db.remove({ _id: postDb._id!, _rev: postDb._rev! });
          });
        });
      });
  }

  updatePost(post: Post): Promise<DbEntryMethaData> {
    return this.db.get<PostDB>(post._id!).then((postDb: PostDB) => {
      postDb.content = post.content;
      postDb.date = post.date;
      postDb.likes = post.dislikes;
      postDb.dislikes = post.dislikes;

      return this.db.put(postDb);
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

  let comment: Comment = {
    author: 'Just another author',
    date: 'Today',
    content: 'This is a commentar',
    likes: 123,
    dislikes: 345,
  };

  post.comments.push(comment);

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

export function testUpdatePost(post: Post) {
  console.log('Start update post test');

  let dbWrapper: DBWrapper = new DBWrapper();
  dbWrapper.updatePost(post).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function testGetPost(id: string) {
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

export function resetDatabaseTest() {
  let dbWrapper: DBWrapper = new DBWrapper();

  dbWrapper.destroyDatabase();
}

export function genericTestMethod() {
  let dbWrapper: DBWrapper = new DBWrapper();

  dbWrapper.getAllPosts().then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function addCommentToPostTest() {
  let dbWrapper: DBWrapper = new DBWrapper();

  let comment: Comment = {
    author: 'Ein Anderer',
    content: 'Das hier ist ein Kommentar',
    likes: 420,
    dislikes: 69,
    date: 'Heute',
  };

  dbWrapper.addCommentToPost('3e91dc5b-591e-423c-a5ef-388965160a32', comment).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}
