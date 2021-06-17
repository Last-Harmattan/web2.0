import React from 'react';
import './PostHeader.css';

interface PostHeaderProps {
  name: string;
  time: string;
  isComment: boolean;
}

export function PostHeader(props: PostHeaderProps) {
  const className = props.isComment ? 'Comment-Header' : 'Post-Header';

  return (
    <div className={className}>
      <div className='Post-Header-Name'>{props.name}</div>
      <div className='Post-Header-Time'>{props.time}</div>
    </div>
  );
}
