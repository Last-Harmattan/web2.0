import React from 'react';
import './Post.css';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

interface PostProps {
  name: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
  isComment: boolean;
}

export function Post(props: PostProps) {
  const className = props.isComment ? 'Comment' : '';

  return (
    <div className={className}>
      <PostHeader name={props.name} time={props.time} isComment={props.isComment} />
      <PostContent content={props.content} />
      <PostFooter likes={props.likes} dislikes={props.dislikes} isComment={props.isComment} />
    </div>
  );
}
