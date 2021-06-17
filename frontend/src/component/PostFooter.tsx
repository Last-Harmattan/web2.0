import React from 'react';
import './PostFooter.css';

interface PostFooterProps {
  likes: number;
  dislikes: number;
  isComment: boolean;
}

function PostFooter(props: PostFooterProps) {
  return getLayout(props);
}

function getLayout(props: PostFooterProps) {
  if (props.isComment) {
    return getLayoutForComment(props);
  } else {
    return getLayoutForPost(props);
  }
}

function getLayoutForComment(props: PostFooterProps) {
  return (
    <div className='Post-Footer'>
      <div className='Post-Footer-Rating'>{getRatingString(props)}</div>
    </div>
  );
}

function getLayoutForPost(props: PostFooterProps) {
  return (
    <div className='Post-Footer'>
      <input
        className='Post-Footer-Comment'
        type='text'
        id='comment'
        name='comment'
        placeholder='Kommentieren'
      ></input>
      <div className='Post-Footer-Rating'>{getRatingString(props)}</div>
    </div>
  );
}

function getRatingString(props: PostFooterProps) {
  return props.likes + ' Likes | ' + props.dislikes + ' Dislikes';
}

export default PostFooter;
