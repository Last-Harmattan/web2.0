import React, { useState } from 'react';
import './Components.css';

interface PostFooterProps {
  likes: number;
  dislikes: number;
  isComment: boolean;
}

function PostFooter(props: PostFooterProps) {
  const [likes] = useState<number>(props.likes);
  const [dislikes] = useState<number>(props.dislikes);
  return getLayout(props, likes, dislikes);
}

function getLayout(props: PostFooterProps, likes: number, dislikes: number) {
  if (props.isComment) {
    return getLayoutForComment(props, likes, dislikes);
  } else {
    return getLayoutForPost(props, likes, dislikes);
  }
}

function getLayoutForComment(props: PostFooterProps, likes: number, dislikes: number) {
  return (
    <div className='Post-Footer'>
      <div className='Post-Footer-Rating'>{getRatingString(likes, dislikes)}</div>
    </div>
  );
}

function getLayoutForPost(props: PostFooterProps, likes: number, dislikes: number) {
  return (
    <div className='Post-Footer'>
      <input
        className='Post-Footer-Comment'
        type='text'
        id='comment'
        name='comment'
        placeholder='Kommentieren'
      ></input>
      <div className='Post-Footer-Rating'>{getRatingString(likes, dislikes)}</div>
    </div>
  );
}

function getRatingString(likes: number, dislikes: number) {
  return likes + ' Likes | ' + dislikes + ' Dislikes';
}

export default PostFooter;
