import React from 'react';
import './Components.css';

interface PostContentProps {
  content: string;
}

class PostContent extends React.Component<PostContentProps, {}> {
  constructor(props: PostContentProps) {
    super(props);
  }

  render() {
    return <div className='Post-Content'>{this.props.content}</div>;
  }
}

export default PostContent;
