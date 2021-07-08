import React from 'react';
import './App.css';
import { Post } from './component/Post';
import { UserDbTestComponent } from './database/UserDbTestComponent';

export function App() {
  /* 
  return (
    <div className='Center'>
      <Post
        name={'Alexander Peterson'}
        time={'4:44'}
        content={'Pommes und Disco'}
        likes={420}
        dislikes={69}
        isComment={false}
      />
      <Post
        name={'Alexander Peterson'}
        time={'4:44'}
        content={'Pommes und Disco'}
        likes={420}
        dislikes={69}
        isComment={true}
      />
    </div>
  );
  */
  return <UserDbTestComponent></UserDbTestComponent>;
}
