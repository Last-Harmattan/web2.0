import React from 'react';
import { Button } from './Button';
import styles from './PostInputField.module.css';

interface PostInputFieldProps {
  placeholder: string;
  maxChars: number;
  /**
   * The current value to be rendered inside the post input field.
   */
  value: string;
  /**
   * Is called with the new value of the post input whenever its changed.
   */
  onChangeValue: (newValue: string) => void;
  /**
   * Is called whenever the user clicks on the send button in this component.
   */
  onSubmit: () => void;
}

export function PostInputField(props: PostInputFieldProps) {
  return (
    <div className={styles.PostInputContainer}>
      <textarea
        className={styles.PostInputField}
        placeholder={props.placeholder}
        maxLength={props.maxChars}
        name='Post'
        value={props.value}
        onChange={ev => props.onChangeValue(ev.target.value)}
      />
      <Button label='Senden' onClick={props.onSubmit} />
    </div>
  );
}
