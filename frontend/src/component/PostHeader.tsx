import React from 'react';
import './Components.css';

interface PostHeaderProps {
  name: string;
  time: string;
  isComment: boolean;
}

function PostHeader(props: PostHeaderProps) {
  const className = props.isComment ? 'Comment-Header' : 'Post-Header';

  return (
    <div className={className}>
      <div className='Post-Header-Name'>{props.name}</div>
      <div className='Post-Header-Time'>{props.time}</div>
    </div>
  );
}

export default PostHeader;
