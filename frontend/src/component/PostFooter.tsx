import React from 'react';
import './Components.css';

interface PostFooterProps {
  likes: number;
  dislikes: number;
}

class PostFooter extends React.Component<PostFooterProps, {}> {
  render() {
    var ratingString = this.props.likes + ' Likes | ' + this.props.dislikes + ' Dislikes';

    return (
      <div className='Post-Footer'>
        <input
          className='Post-Footer-Comment'
          type='text'
          id='comment'
          name='comment'
          placeholder='Kommentieren'
        ></input>
        <div className='Post-Footer-Rating'>{ratingString}</div>
      </div>
    );
  }
}

export default PostFooter;
