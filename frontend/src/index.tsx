import React from 'react';
import ReactDOM from 'react-dom';
import Post from './component/Post';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Post
      name={'Alexander Peterson'}
      time={'4:44'}
      content={'Pommes und Disco'}
      likes={420}
      dislikes={69}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
