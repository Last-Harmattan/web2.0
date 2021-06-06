import React, { useState } from 'react';
import './Components.css';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

interface PostProps {
  name: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
  isComment: boolean;
}

function Post(props: PostProps) {
  const [name] = useState<string>(props.name);
  const [time] = useState<string>(props.time);
  const [content] = useState<string>(props.content);
  const [likes] = useState<number>(props.likes);
  const [dislikes] = useState<number>(props.dislikes);

  var className = props.isComment ? 'Comment' : '';

  return (
    <div className={className}>
      <PostHeader name={name} time={time} isComment={props.isComment} />
      <PostContent content={content} />
      <PostFooter likes={likes} dislikes={dislikes} isComment={props.isComment} />
    </div>
  );
}

export default Post;
