import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../component/Button';
import { TextInput, TextInputType } from '../component/TextInput';
import { AppDispatch } from '../state/store';
import { register } from '../state/userSlice';
import styles from './Signup.module.css';

export function Signup() {
  const [userName, setUserName] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSubmitClick = () => {
    dispatch(register({ userName }));
  };

  return (
    <div>
      <div className={styles['Center']}>
        <div className={styles['Heading']}>Registrieren</div>
        <div>
          <TextInput
            placeholder={'Nutzername'}
            type={TextInputType.TEXT}
            value={userName}
            onChange={ev => setUserName(ev.target.value)}
          ></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Public Key'} type={TextInputType.TEXT} disabled></TextInput>
        </div>
        <div>
          <TextInput placeholder={'Private Key'} type={TextInputType.PASSWORD} disabled></TextInput>
        </div>
        <div className={styles['Button-Margin']}>
          <Button label={'Registrieren'} onClick={handleSubmitClick}></Button>
        </div>
      </div>
    </div>
  );
}
