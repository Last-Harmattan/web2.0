import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function Button(props: ButtonProps) {
  const { label, ...htmlProps } = props;
  return (
    <button className={styles.button} {...htmlProps}>
      {props.label}
    </button>
  );
}
