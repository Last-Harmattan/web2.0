import React from 'react';
import styles from './Post.module.css';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';

export interface PostProps {
  name: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
  isComment: boolean;
}

export function Post(props: PostProps) {
  const className = props.isComment ? styles.Comment : styles.Post;

  return (
    <div className={className}>
      <PostHeader name={props.name} time={props.time} isComment={props.isComment} />
      <PostContent content={props.content} />
      <PostFooter likes={props.likes} dislikes={props.dislikes} isComment={props.isComment} />
    </div>
  );
}
