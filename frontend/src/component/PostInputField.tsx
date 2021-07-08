import React from 'react';
import './PostInputField.css';

interface PostInputFieldProps {
  placeholder: string;
  maxChars: number;
}

export function PostInputField(props: PostInputFieldProps) {
  return (
    <textarea
      className={'PostInputField'}
      placeholder={props.placeholder}
      maxLength={props.maxChars}
      name={'Post'}
    />
  );
}
