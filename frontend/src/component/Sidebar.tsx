import React, { useState } from 'react';
import { Button } from './Button';
import { RootState } from '../state/reducers';
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetFriendRequestResult, searchUser, sendFriendRequest } from '../api/backend';
import { toast } from 'react-toastify';
import { AppDispatch } from '../state/store';
import { acceptFriendRequest } from '../state/friendsSlice';

interface SidebarProps {
  userNameMap: { [userId: string]: string };
}

export function Sidebar(props: SidebarProps) {
  const dispatch: AppDispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.friends.friends);
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests);
  const currentUser = useSelector((state: RootState) => state.user.currentUser!);

  const [newFriendName, setNewFriendName] = useState('');

  const handleSubmitNewFriendRequest = async () => {
    try {
      const user = await searchUser(newFriendName.trim());
      if (!user) {
        toast.error('User not found');
        return;
      }

      await sendFriendRequest(currentUser._id, user.userId);
      setNewFriendName('');
      toast.info('Freundschaftsanfrage gesendet!');
    } catch (err) {
      toast.error('Sending friend request failed: ' + JSON.stringify(err));
    }
  };

  const handleAcceptFriendRequest = (request: GetFriendRequestResult) => {
    // Error handling is done by friendsSlice.
    dispatch(acceptFriendRequest(request));
  };

  return (
    <div className={styles.Sidebar}>
      <input
        type='text'
        className={styles.Searchbar}
        placeholder='Benutzername'
        value={newFriendName}
        onChange={ev => setNewFriendName(ev.target.value)}
      />
      <Button
        label='Freund Hinzufügen'
        onClick={handleSubmitNewFriendRequest}
        className={styles.Button}
      />
      <hr />
      {friendRequests.length > 0 && (
        <>
          <small>
            <strong className={styles.Subheading}>Freundschaftsanfragen</strong>
          </small>
          {friendRequests.map(request => (
            <div className={styles.Friend} key={request.from}>
              <p className={styles.User}>{request.userName}</p>
              <Button
                label='Akzeptieren'
                className={styles.AcceptButton}
                onClick={() => handleAcceptFriendRequest(request)}
              />
              <hr />
            </div>
          ))}
        </>
      )}
      {friends.length > 0 && (
        <>
          <small>
            <strong className={styles.Subheading}>Freunde</strong>
          </small>
          {friends.map(friend => (
            <div className={styles.Friend} key={friend._id}>
              <p className={styles.FriendField}>
                <b>{friend.userName}</b>
              </p>
              <small className={styles.FriendField}>
                Last Online: {friend.lastOnline || 'noch nie'}
              </small>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
