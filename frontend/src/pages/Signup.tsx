import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../component/Button';
import { TextInput, TextInputType } from '../component/TextInput';
import './Signup.css';

export function Signup() {
  return (
    <div>
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
        <Link to='/login' className='Login-Link'>
          Anmelden
        </Link>
      </div>
    </div>
  );
}
