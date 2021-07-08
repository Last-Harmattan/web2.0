import React from 'react';
import styles from './PostContent.module.css';

interface PostContentProps {
  content: string;
}

export function PostContent(props: PostContentProps) {
  return <div className={styles['Post-Content']}>{props.content}</div>;
}
