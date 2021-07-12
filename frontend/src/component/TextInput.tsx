import React, { InputHTMLAttributes } from 'react';
import styles from './TextInput.module.css';

export enum TextInputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: TextInputType;
}

export function TextInput(props: TextInputProps) {
  const { placeholder, type, ...htmlProps } = props;

  return (
    <input
      {...htmlProps}
      type={props.type}
      placeholder={props.placeholder}
      className={styles.login_text_input}
    ></input>
  );
}
