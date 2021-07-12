import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../api/backend';
import { Post } from '../component/Post';
import { PostInputField } from '../component/PostInputField';
import { Sidebar } from '../component/Sidebar';
import { addPost } from '../state/postsSlice';
import { RootState } from '../state/reducers';
import { AppDispatch } from '../state/store';
import styles from './Feed.module.css';

export function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const currentUser = useSelector((state: RootState) => state.user.currentUser!);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Sort by newest post first, memoize the sorted array to avoid sorting on every render.
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }

      if (a.date > b.date) {
        return -1;
      }

      return 0;
    });
  }, [posts]);

  const handlePostInputSubmit = () => {
    dispatch(
      addPost({
        authorId: currentUser._id,
        comments: [],
        content: newPostContent,
        date: new Date().toISOString(),
        dislikes: 0,
        likes: 0,
      })
    );
    setNewPostContent('');
  };

  const handleSearchQuery = () => {
    setSearchQuery('');
    return searchUser(searchQuery);
  };

  return (
    <div className={styles.Center}>
      <Sidebar
        value={searchQuery}
        onChangeValue={value => setSearchQuery(value)}
        onSubmit={handleSearchQuery}
      />
      <PostInputField
        placeholder='Was möchtest du sagen?'
        maxChars={200}
        value={newPostContent}
        onChangeValue={value => setNewPostContent(value)}
        onSubmit={handlePostInputSubmit}
      />
      {sortedPosts.map(p => (
        <Post
          key={p._id}
          name={p.authorId}
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
