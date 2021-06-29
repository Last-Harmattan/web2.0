import React from 'react';
import { Banner } from './component/Banner';
import { Button } from './component/Button';
import { TextInput, TextInputType } from './component/TextInput';
import './Login.css';

export function Login() {
  return (
    <div>
      <Banner></Banner>
      <div className='Content'>
        <div className='Heading'>Login</div>
        <div>
          <TextInput placeholder={'Name'} type={TextInputType.TEXT}></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Passwort'} type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div className='Button-Margin'>
          <Button label={'Anmelden'}></Button>
        </div>
        <a href='signuppage.com' className='Registration-Link'>
          {/*durch den Link ersetzen, der zur Registrierung führt*/}
          Registrieren
        </a>
      </div>
    </div>
  );
}
