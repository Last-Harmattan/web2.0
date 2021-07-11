import React from 'react';
import styles from './TextInput.module.css';

export enum TextInputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

interface TextInputProps {
  placeholder: string;
  type: TextInputType;
  onChangeValue?: (newValue: string) => void;
}

export function TextInput(props: TextInputProps) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={styles.login_text_input}
      onChange={ev => {
        if (props != null) props.onChangeValue!!(ev.target.value);
      }}
    ></input>
  );
}
