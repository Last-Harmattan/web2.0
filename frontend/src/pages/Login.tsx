import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../component/Button';
import { TextInput, TextInputType } from '../component/TextInput';
import styles from './Login.module.css';

export function Login() {
  return (
    <div>
      <div className={styles.Content}>
        <div className={styles.Heading}>Login</div>
        <div>
          <TextInput placeholder='Name' type={TextInputType.TEXT}></TextInput>
        </div>
        <div>
          <TextInput placeholder='Passwort' type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div className={styles['Button-Margin']}>
          <Button label='Anmelden'></Button>
        </div>
        <Link to='/signup' className={styles['Registration-Link']}>
          Registrieren
        </Link>
      </div>
    </div>
  );
}
