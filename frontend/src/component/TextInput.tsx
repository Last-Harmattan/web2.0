import React from 'react';
import './TextInput.css';

export enum TextInputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

interface TextInputProps {
  placeholder: string;
  type: TextInputType;
}

export function TextInput(props: TextInputProps) {
  return (
    <input type={props.type} placeholder={props.placeholder} className='login_text_input'></input>
  );
}
