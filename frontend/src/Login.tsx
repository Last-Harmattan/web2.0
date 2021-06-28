import React from 'react';
import { Banner } from './component/Banner';
import { Button } from './component/Button';
import { TextInput, TextInputType } from './component/TextInput';
import './Login.css';

export function Login() {
  return (
    <div>
      <Banner></Banner>
      <div className='Center'>
        <div className='Heading'>Login</div>
        <div>
          <TextInput placeholder={'Name'} type={TextInputType.TEXT}></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Passwort'} type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div>
          <Button label={'Anmelden'}></Button>
        </div>
      </div>
    </div>
  );
}
