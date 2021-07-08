import React from 'react';
import styles from './PostInputField.module.css';

interface PostInputFieldProps {
  placeholder: string;
  maxChars: number;
}

export function PostInputField(props: PostInputFieldProps) {
  return (
    <textarea
      className={styles.PostInputField}
      placeholder={props.placeholder}
      maxLength={props.maxChars}
      name={'Post'}
    />
  );
}
