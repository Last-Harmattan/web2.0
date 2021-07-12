import React from 'react';
import { Button } from './Button';
import { RootState } from '../state/reducers';
import styles from './Sidebar.module.css';
import { useSelector } from 'react-redux';

interface SidebarProps {
  value: string;
  onSubmit: () => object;
  onChangeValue: (newValue: string) => void;
}

export function Sidebar(props: SidebarProps) {
  const friends = useSelector((state: RootState) => state.friends.friends);

  return (
    <div className={styles.Sidebar}>
      <input
        type='text'
        className={styles.Searchbar}
        value={props.value}
        onChange={ev => props.onChangeValue(ev.target.value)}
      />
      <Button label='Freund Hinzufügen' onClick={props.onSubmit} className={styles.Button} />
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
    </div>
  );
}
