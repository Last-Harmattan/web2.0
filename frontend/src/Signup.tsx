import React from 'react';
import { Banner } from './component/Banner';
import { Button } from './component/Button';
import { TextInput, TextInputType } from './component/TextInput';
import './Signup.css';

export function Signup() {
  return (
    <div>
      <Banner></Banner>
      <div className='Center'>
        <div className='Heading'>Registrieren</div>
        <div>
          <TextInput placeholder={'Nutzername'} type={TextInputType.TEXT}></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Passwort'} type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Passwort wiederholen'} type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div className='Button-Margin'>
          <Button label={'Registrieren'}></Button>
        </div>
        <a href='loginpage.com' className='Login-Link'>
          {/*durch den Link ersetzen, der zur Anmeldung führt*/}
          Anmelden
        </a>
      </div>
    </div>
  );
}
