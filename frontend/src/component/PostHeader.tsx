import React from 'react';
import styles from './PostHeader.module.css';

interface PostHeaderProps {
  name: string;
  time: string;
  isComment: boolean;
}

export function PostHeader(props: PostHeaderProps) {
  const className = props.isComment ? styles['Comment-Header'] : styles['Post-Header'];

  return (
    <div className={className}>
      <div className={styles['Post-Header-Name']}>{props.name}</div>
      <div className={styles['Post-Header-Time']}>{props.time}</div>
    </div>
  );
}
