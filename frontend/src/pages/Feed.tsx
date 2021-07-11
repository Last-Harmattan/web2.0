import { DataConnection } from 'peerjs';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../component/Button';
import { Post } from '../component/Post';
import { PostInputField } from '../component/PostInputField';
import { TextInput, TextInputType } from '../component/TextInput';
import { PeerJSService } from '../peerJS/PeerJSService';
import { PostCommunicationData } from '../peerJS/PostRequest';
import * as PostService from '../peerJS/PostService';
import { addPost } from '../state/postsSlice';
import { RootState } from '../state/reducers';
import { AppDispatch } from '../state/store';
import styles from './Feed.module.css';

export function Feed() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const currentUser = useSelector((state: RootState) => state.user.currentUser!);
  const [newPostContent, setNewPostContent] = useState('');
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

  return (
    <div className={styles.Center}>
      <Button label={'Refresh'} onClick={onRefreshClicked}></Button>
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

let peerJSService: PeerJSService = new PeerJSService();
var connection: DataConnection | null = null;
var connectedToServer: boolean = false;
var connectedtoforeignPeer: boolean = false;
var foreignPeerID: string = '';

initPeerJSService();

function initPeerJSService() {
  peerJSService.openNewPeer(onPeerOpened, onPeerDisconnected, onConnected);
}

function onPeerOpened(id: string) {
  connectedToServer = true;
  console.log('Opened Peer with id: ', id);
}

function onPeerDisconnected() {
  connectedToServer = false;
}

function onRefreshClicked() {
  console.log('Button Clicked');
  onConnected(peerJSService.connectToForeignPeer(foreignPeerID));
}

function onConnected(newConnection?: DataConnection) {
  if (newConnection == null || connectedtoforeignPeer) {
    newConnection?.close();
    return;
  }
  connection = newConnection;
  console.log('connected to foreingn peer: ', connection.peer);
  connection.on('open', onReadyToSendData);
  connection.on('data', onMessageReceived);
  connection.on('close', onConnectionClosed);
  connection.on('error', onConnectionError);
}

function onReadyToSendData() {
  console.log('Ready to send Data!');
  connectedtoforeignPeer = true;
  let msg = PostService.getCurrentPostTimestampRequestMessage();
  connection?.send(msg);
}

function onMessageReceived(data: string) {
  console.log('Received Message: ', data);
  let responseData = PostService.mapJSONResponseToPostCommunicationData(data);
  console.log(responseData);
  PostService.handleResponseData(
    responseData,
    handleTimeResponse,
    handlePostResponse,
    handleTimeRequest,
    handlePostRequest
  );
}

function onConnectionClosed() {
  connectedtoforeignPeer = false;
  connection = null;
}

function onConnectionError(error: any) {
  console.log(error);
  connectedtoforeignPeer = false;
  connection = null;
}

function onIDChanged(id: string) {
  foreignPeerID = id;
}

function handleTimeResponse(response: PostCommunicationData) {
  // TODO: check if Time is newer than last known one and request new Posts if so, else disconnect
}

function handlePostResponse(response: PostCommunicationData) {
  // TODO: insert new Posts into database an update UI and disconnect
}

function handleTimeRequest() {
  // TODO: send the most current Time to current connected Peer
}

function handlePostRequest(response: PostCommunicationData) {
  // TODO: send new Posts after given Timestamp to connected Peer and disconnect
}
