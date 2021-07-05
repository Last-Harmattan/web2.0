import { CommentDBWrapper } from '../PostCommentDatabase';
import { Post } from '../types/public/Post';
import { Comment } from '../types/public/Comment';

export function testSaveNewPost(post: Post) {
  console.log('Start store new post test');

  let comment1: Comment = {
    author: 'author1',
    date: '1:00',
    content: 'Comment1',
    likes: 420,
    dislikes: 69,
  };

  let comment2: Comment = {
    author: 'author2',
    date: '2:00',
    content: 'Comment1',
    likes: 123,
    dislikes: 123,
  };

  let comment3: Comment = {
    author: 'author3',
    date: '3:00',
    content: 'Comment3',
    likes: 1,
    dislikes: 5,
  };

  let comment4: Comment = {
    author: 'author4',
    date: '4:00',
    content: 'Comment4',
    likes: 4,
    dislikes: 3,
  };

  post.comments.push(comment1);
  post.comments.push(comment2);
  post.comments.push(comment3);
  post.comments.push(comment4);

  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();
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

  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();
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

  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();
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
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.destroyDatabase();
}

export function addCommentToPostTest() {
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

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

export function deletePostTest(id: string) {
  console.log('Start delete Post Test!');
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.deletePost(id).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function deleteCommentTest(id: string) {
  console.log('Start delete Comment Test!');
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.deleteComment(id).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function genericTestMethod() {
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.showCompleteDatabaseContent().then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}
