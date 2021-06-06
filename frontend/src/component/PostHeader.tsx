import React, { useState } from 'react';
import './Components.css';

interface PostHeaderProps {
  name: string;
  time: string;
  isComment: boolean;
}

function PostHeader(props: PostHeaderProps) {
  const [name] = useState<string>(props.name);
  const [time] = useState<string>(props.time);

  var className = props.isComment ? 'Comment-Header' : 'Post-Header';

  return (
    <div className={className}>
      <div className='Post-Header-Name'>{name}</div>
      <div className='Post-Header-Time'>{time}</div>
    </div>
  );
}

export default PostHeader;
