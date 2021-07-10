import React from 'react';
import { Post } from './types/public/Post';
import { Comment } from './types/public/Comment';
import * as PostCommentTests from './tests/PostCommentDatabaseTests';

export class TestSidePostCommentDB extends React.Component {
  savePost = () => {
    let post: Post = this.readPostInfos();

    PostCommentTests.testSaveNewPost(post);
  };

  updatePost = () => {
    let post: Post = this.readPostInfos();

    PostCommentTests.testUpdatePost(post);
  };

  getPost = () => {
    let id = (document.getElementById('PostId') as HTMLInputElement).value;
    PostCommentTests.testGetPost(id);
  };

  deletePost = () => {
    let id = (document.getElementById('PostId') as HTMLInputElement).value;
    PostCommentTests.deletePostTest(id);
  };

  saveNewComment = () => {
    let commentPostID = (document.getElementById('CommentPostID') as HTMLInputElement).value;
    let comment: Comment = this.readCommentInfos();

    PostCommentTests.addCommentToPostTest(commentPostID, comment);
  };

  updateComment = () => {
    let comment: Comment = this.readCommentInfos();
    PostCommentTests.updateCommentTest(comment);
  };

  deleteComment = () => {
    let comment: Comment = this.readCommentInfos();
    PostCommentTests.deleteCommentTest(comment._id!);
  };

  getCommentsToPost = () => {
    let id = (document.getElementById('PostId') as HTMLInputElement).value;
    PostCommentTests.getCommentByIdTest(id);
  };

  resetDatabase = () => {
    PostCommentTests.resetDatabaseTest();
  };

  postsAfterTime = () => {
    PostCommentTests.getAllPostsAfterTime();
  };

  genericTest = () => {
    PostCommentTests.genericTestMethod();
    //console.log(new Date().toISOString()); //2021-07-10T09:48:50.609Z
  };

  private readPostInfos(): Post {
    let id = (document.getElementById('PostId') as HTMLInputElement).value;
    let author = (document.getElementById('PostAuthor') as HTMLInputElement).value;
    let date = (document.getElementById('PostDate') as HTMLInputElement).value;
    let content = (document.getElementById('PostContent') as HTMLInputElement).value;
    let likes = (document.getElementById('PostLikes') as HTMLInputElement).value;
    let dislikes = (document.getElementById('PostDislikes') as HTMLInputElement).value;

    return {
      _id: id,
      author: author,
      date: date,
      content: content,
      likes: +likes,
      dislikes: +dislikes,
      comments: [],
    };
  }

  private readCommentInfos(): Comment {
    let id = (document.getElementById('CommentID') as HTMLInputElement).value;
    let author = (document.getElementById('CommentAuthor') as HTMLInputElement).value;
    let date = (document.getElementById('CommentDate') as HTMLInputElement).value;
    let content = (document.getElementById('CommentContent') as HTMLInputElement).value;
    let likes = (document.getElementById('CommentLikes') as HTMLInputElement).value;
    let dislikes = (document.getElementById('CommentDislikes') as HTMLInputElement).value;

    return {
      _id: id,
      author: author,
      date: date,
      content: content,
      likes: +likes,
      dislikes: +dislikes,
    };
  }

  render() {
    return (
      <>
        <h1>Database Tests</h1>
        <h2>Post Tests</h2>

        <label>ID:</label>
        <br></br>
        <input id='PostId'></input>
        <br></br>

        <label>Author:</label>
        <br></br>
        <input id='PostAuthor'></input>
        <br></br>

        <label>Date:</label>
        <br></br>
        <input id='PostDate'></input>
        <br></br>

        <label>Content:</label>
        <br></br>
        <input id='PostContent'></input>
        <br></br>

        <label>Likes:</label>
        <br></br>
        <input id='PostLikes' type='number'></input>
        <br></br>

        <label>Dislikes:</label>
        <br></br>
        <input id='PostDislikes' type='number'></input>
        <br></br>

        <>For Updating a post the id has to be set!</>
        <br></br>
        <button onClick={this.savePost}>SavePost!</button>
        <button onClick={this.updatePost}>Update Post!</button>
        <button onClick={this.deletePost}>DeletePost</button>
        <button onClick={this.getPost}>Get Post</button>
        <button onClick={this.getCommentsToPost}>Get Comments to Post</button>
        <br></br>
        <br></br>

        <h2>Comment Tests</h2>
        <label>Id: </label>
        <br></br>
        <input id='CommentID'></input>
        <br></br>
        <label>PostID: </label>
        <br></br>
        <input id='CommentPostID'></input>
        <br></br>
        <label>Author: </label>
        <br></br>
        <input id='CommentAuthor'></input>
        <br></br>
        <label>Date: </label>
        <br></br>
        <input id='CommentDate'></input>
        <br></br>
        <label>Content: </label>
        <br></br>
        <input id='CommentContent'></input>
        <br></br>
        <label>Likes: </label>
        <br></br>
        <input id='CommentLikes'></input>
        <br></br>
        <label>Dislikes: </label>
        <br></br>
        <input id='CommentDislikes'></input>
        <br></br>

        <button onClick={this.saveNewComment}>Save Comment</button>
        <button onClick={this.updateComment}>Update Comment</button>
        <button onClick={this.deleteComment}>Delete Comment</button>
        <br></br>
        <br></br>

        <button onClick={this.resetDatabase}>Reset Database</button>

        <br></br>
        <br></br>

        <button onClick={this.postsAfterTime}>PostsAfterTime</button>
        <button onClick={this.genericTest}>Generic Test</button>
      </>
    );
  }
}
