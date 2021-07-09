import { CommentDBWrapper } from '../PostCommentDatabase';
import { Post } from '../types/public/Post';
import { Comment } from '../types/public/Comment';

export function testSaveNewPost(post: Post) {
  console.log('Start store new post test');

  /*
  let comment1: Comment = {
    author: 'author1',
    date: '2021-07-09T13:02:09.339Z',
    content: 'Comment1',
    likes: 420,
    dislikes: 69,
  };

  let comment2: Comment = {
    author: 'author2',
    date: '2021-04-09T13:02:09.339Z',
    content: 'Comment1',
    likes: 123,
    dislikes: 123,
  };

  let comment3: Comment = {
    author: 'author3',
    date: '2025-07-09T13:02:09.339Z',
    content: 'Comment3',
    likes: 1,
    dislikes: 5,
  };

  let comment4: Comment = {
    author: 'author4',
    date: '2021-07-01T13:02:09.339Z',
    content: 'Comment4',
    likes: 4,
    dislikes: 3,
  };

  post.comments.push(comment1);
  post.comments.push(comment2);
  post.comments.push(comment3);
  post.comments.push(comment4);
*/

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

  dbWrapper.destroyDatabase().then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function addCommentToPostTest(postID: string, comment: Comment) {
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.addCommentToPost(postID, comment).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function getCommentByIdTest(id: string) {
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.getCommentsToPost(id).then(
    function onSuccess(result) {
      console.log(result);
    },
    function onFailure(error) {
      console.log(error);
    }
  );
}

export function updateCommentTest(comment: Comment) {
  let dbWrapper: CommentDBWrapper = new CommentDBWrapper();

  dbWrapper.updateComment(comment).then(
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
