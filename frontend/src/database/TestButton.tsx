import React from 'react';
import { Post } from './types/public/Post';
import { testGetPost, testSaveNewPost, resetDatabaseTest } from './PostCommentDatabase';

export class TestButton extends React.Component {
  savePost = () => {
    let id = (document.getElementById('newPostId') as HTMLInputElement).value;
    let author = (document.getElementById('newPostAuthor') as HTMLInputElement).value;
    let date = (document.getElementById('newPostDate') as HTMLInputElement).value;
    let content = (document.getElementById('newPostContent') as HTMLInputElement).value;
    let likes = (document.getElementById('newPostLikes') as HTMLInputElement).value;
    let dislikes = (document.getElementById('newPostDislikes') as HTMLInputElement).value;

    let post: Post = {
      _id: id,
      author: author,
      date: date,
      content: content,
      likes: +likes,
      dislikes: +dislikes,
      comments: [],
    };

    testSaveNewPost(post);
  };

  getPost = () => {
    let id = (document.getElementById('getPostId') as HTMLInputElement).value;
    testGetPost(id);
  };

  resetDatabase = () => {
    resetDatabaseTest();
  };

  render() {
    return (
      <>
        <h1>Database Tests</h1>
        <h2>Test: Save/Update Post</h2>

        <label>ID:</label>
        <br></br>
        <input id='newPostId'></input>
        <br></br>

        <label>Author:</label>
        <br></br>
        <input id='newPostAuthor'></input>
        <br></br>

        <label>Date:</label>
        <br></br>
        <input id='newPostDate'></input>
        <br></br>

        <label>Content:</label>
        <br></br>
        <input id='newPostContent'></input>
        <br></br>

        <label>Likes:</label>
        <br></br>
        <input id='newPostLikes' type='number'></input>
        <br></br>

        <label>Dislikes:</label>
        <br></br>
        <input id='newPostDislikes' type='number'></input>
        <br></br>

        <>For Updating a post the id has to be set!</>
        <br></br>
        <button onClick={this.savePost}>Save/Update Post!</button>

        <h2>GetPostByID Test</h2>
        <label>Id: </label>
        <br></br>
        <input id='getPostId'></input>
        <br></br>
        <button onClick={this.getPost}>getPost</button>
        <br></br>

        <button onClick={this.resetDatabase}>Reset Database!</button>
      </>
    );
  }
}
