import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../component/Post';
import { PostInputField } from '../component/PostInputField';
import { TestSidePostCommentDB } from '../database/TestSidePostCommentDB';
import { RootState } from '../state/reducers';
import { AppDispatch } from '../state/store';
import styles from './Feed.module.css';

export function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [newPostContent, setNewPostContent] = useState('');

  const handlePostInputSubmit = () => {
    console.warn('TODO submit:', newPostContent);
  };

  return (
    <div className={styles.Center}>
      <PostInputField
        placeholder='Was möchtest du sagen?'
        maxChars={200}
        value={newPostContent}
        onChangeValue={value => setNewPostContent(value)}
        onSubmit={handlePostInputSubmit}
      />

      {posts.map(p => (
        <Post
          key={p._id}
          name={p.author}
          time={p.date}
          content={p.content}
          likes={p.likes}
          dislikes={p.dislikes}
          isComment={false}
        />
      ))}
    </div>
  );
}
