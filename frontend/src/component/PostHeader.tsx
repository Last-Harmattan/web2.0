import React from 'react';
import './Components.css';

interface PostHeaderProps {
  name: string;
  time: string;
}

class PostHeader extends React.Component<PostHeaderProps, {}> {
  constructor(props: PostHeaderProps) {
    super(props);
  }

  render() {
    return (
      <div className='Post-Header'>
        <div className='Post-Header-Name'>{this.props.name}</div>
        <div className='Post-Header-Time'>{this.props.time}</div>
      </div>
    );
  }
}

export default PostHeader;
