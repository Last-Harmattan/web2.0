import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../component/Button';
import { Post } from '../component/Post';
import { PostInputField } from '../component/PostInputField';
import { TextInput, TextInputType } from '../component/TextInput';
import * as PostService from '../peerJS/PostService';
import { Sidebar } from '../component/Sidebar';
import { TestSidePostCommentDB } from '../database/TestSidePostCommentDB';
import { addPost } from '../state/postsSlice';
import { RootState } from '../state/reducers';
import { AppDispatch } from '../state/store';
import { searchUser } from '../api/backend';
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
      <Button label={'Refresh'} onClick={onRefreshClicked}></Button>
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

      <TextInput
        placeholder={'Foreign Peer ID'}
        type={TextInputType.TEXT}
        onChangeValue={onIDChanged}
      ></TextInput>

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

var mforeignPeerID: string = '';

PostService.addEventHandler((foreingPeerID: string, time: string) => {
  console.log('Event handler: ', foreingPeerID, ', ', time);
  return new Promise((resolve, reject) => {
    resolve([]);
  });
});

PostService.openPeer().then((id: string) => {
  console.log('Opened peer with id: ', id);
});

function onRefreshClicked() {
  console.log('Button Clicked');
  PostService.sendGetNewPostsRequest(mforeignPeerID, '12:34');
}

function onIDChanged(id: string) {
  mforeignPeerID = id;
}
