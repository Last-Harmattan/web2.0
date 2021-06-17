import React from 'react';
import './PostContent.css';

interface PostContentProps {
  content: string;
}

export function PostContent(props: PostContentProps) {
  return <div className='Post-Content'>{props.content}</div>;
}
