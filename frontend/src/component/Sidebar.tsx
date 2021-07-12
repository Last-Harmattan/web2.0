import React, { useState } from 'react';
import { Button } from './Button';
import { RootState } from '../state/reducers';
import styles from './Sidebar.module.css';
import { useSelector } from 'react-redux';
import { searchUser, sendFriendRequest } from '../api/backend';
import { toast } from 'react-toastify';

interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  const friends = useSelector((state: RootState) => state.friends.friends);
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests);
  const currentUser = useSelector((state: RootState) => state.user.currentUser!);

  const [newFriendName, setNewFriendName] = useState('');

  const handleSubmit = async () => {
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

  return (
    <div className={styles.Sidebar}>
      <input
        type='text'
        className={styles.Searchbar}
        value={newFriendName}
        onChange={ev => setNewFriendName(ev.target.value)}
      />
      <Button label='Freund Hinzufügen' onClick={handleSubmit} className={styles.Button} />
      <hr />
      {friends.map(friend => (
        <div className={styles.Friend} key={friend._id}>
          <p className={styles.FriendField}>
            <b>{friend.userName}</b>
          </p>
          <p className={styles.FriendField}>Last Online: {friend.lastOnline}</p>
          <hr />
        </div>
      ))}
      {props.requests.map(request => (
        <div className={styles.Friend} key={request.from}>
          <p className={styles.User}>{request.from}</p>
          <Button
            label='Akzeptieren'
            onClick={props.acceptRequest}
            className={styles.AcceptButton}
          />
          <hr />
        </div>
      ))}
    </div>
  );
}
