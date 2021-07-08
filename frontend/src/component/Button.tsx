import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
}

export function Button(props: ButtonProps) {
  return <button className='button'>{props.label}</button>;
}
