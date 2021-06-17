import React from 'react';
import './Components.css';

interface PostContentProps {
  content: string;
}

function PostContent(props: PostContentProps) {
  return <div className='Post-Content'>{props.content}</div>;
}

export default PostContent;
