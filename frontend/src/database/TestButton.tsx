import React from 'react';
import { test } from './PostCommentDatabase';

export class TestButton extends React.Component {
  handleClick = () => {
    test();
  };

  render() {
    return <button onClick={this.handleClick}>Click me hard!</button>;
  }
}
