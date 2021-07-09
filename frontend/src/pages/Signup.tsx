import React from 'react';
import { Button } from '../component/Button';
import { TextInput, TextInputType } from '../component/TextInput';
import styles from './Signup.module.css';

export function Signup() {
  return (
    <div>
      <div className={styles['Center']}>
        <div className={styles['Heading']}>Registrieren</div>
        <div>
          <TextInput placeholder={'Nutzername'} type={TextInputType.TEXT}></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Passwort'} type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Passwort wiederholen'} type={TextInputType.PASSWORD}></TextInput>
        </div>
        <div className={styles['Button-Margin']}>
          <Button label={'Registrieren'}></Button>
        </div>
      </div>
    </div>
  );
}
