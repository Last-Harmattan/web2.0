import React, { useMemo } from 'react';
import styles from './Post.module.css';
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
  const className = props.isComment ? styles.Comment : styles.Post;
  const dateTime = useMemo(() => new Date(props.time).toLocaleString(), [props.time]);

  return (
    <div className={className}>
      <PostHeader name={props.name} time={dateTime} isComment={props.isComment} />
      <PostContent content={props.content} />
      <PostFooter likes={props.likes} dislikes={props.dislikes} isComment={props.isComment} />
    </div>
  );
}
