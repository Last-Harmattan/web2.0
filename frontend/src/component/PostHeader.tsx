import React from 'react';
import './Components.css';

interface PostHeaderProps {
  name: string;
  time: string;
  isComment: boolean;
}

class PostHeader extends React.Component<PostHeaderProps, {}> {
  render() {
    var className = this.props.isComment ? 'Comment-Header' : 'Post-Header';
    return (
      <div className={className}>
        <div className='Post-Header-Name'>{this.props.name}</div>
        <div className='Post-Header-Time'>{this.props.time}</div>
      </div>
    );
  }
}

export default PostHeader;
