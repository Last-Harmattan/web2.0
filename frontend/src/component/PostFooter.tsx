import React from 'react';
import './Components.css';

interface PostFooterProps {
  likes: number;
  dislikes: number;
  isComment: boolean;
}

class PostFooter extends React.Component<PostFooterProps, {}> {
  render() {
    return this.getLayout();
  }

  getLayout() {
    if (this.props.isComment) {
      return this.getLayoutForComment();
    } else {
      return this.getLayoutForPost();
    }
  }

  getLayoutForComment() {
    return (
      <div className='Post-Footer'>
        <div className='Post-Footer-Rating'>{this.getRatingString()}</div>
      </div>
    );
  }

  getLayoutForPost() {
    return (
      <div className='Post-Footer'>
        <input
          className='Post-Footer-Comment'
          type='text'
          id='comment'
          name='comment'
          placeholder='Kommentieren'
        ></input>
        <div className='Post-Footer-Rating'>{this.getRatingString()}</div>
      </div>
    );
  }

  getRatingString() {
    return this.props.likes + ' Likes | ' + this.props.dislikes + ' Dislikes';
  }
}

export default PostFooter;
