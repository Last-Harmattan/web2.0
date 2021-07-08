import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
}

export function Button(props: ButtonProps) {
  return <button className={styles.button}>{props.label}</button>;
}
