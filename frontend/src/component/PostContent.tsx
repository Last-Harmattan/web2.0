import React, { useState } from 'react';
import './Components.css';

interface PostContentProps {
  content: string;
}

function PostContent(props: PostContentProps) {
  const [content] = useState<string>(props.content);

  return <div className='Post-Content'>{content}</div>;
}

export default PostContent;
