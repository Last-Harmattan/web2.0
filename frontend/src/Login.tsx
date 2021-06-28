import React from 'react';
import { Button } from './component/Button';
import { TextInput, TextInputType } from './component/TextInput';
import './Login.css';

export function Login() {
  return (
    <div className='Center'>
      <div>
        <TextInput placeholder={'Name'} type={TextInputType.TEXT}></TextInput>
      </div>
      <div>
        <TextInput placeholder={'Passwort'} type={TextInputType.PASSWORD}></TextInput>
      </div>
      <div>
        <Button label={'Log In'}></Button>
      </div>
    </div>
  );
}
