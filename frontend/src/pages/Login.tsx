import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../component/Button';
import { TextInput, TextInputType } from '../component/TextInput';
import './Login.css';

export function Login() {
  return (
    <div>
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
        <Link to='/signup' className='Registration-Link'>
          Registrieren
        </Link>
      </div>
    </div>
  );
}
