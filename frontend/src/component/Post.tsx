import React from 'react';
import './Components.css';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

interface PostProps {
  name: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
}

class Post extends React.Component<PostProps, {}> {
  constructor(props: PostProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <PostHeader name={this.props.name} time={this.props.time} />
        <PostContent content={this.props.content} />
        <PostFooter likes={this.props.likes} dislikes={this.props.dislikes} />
      </div>
    );
  }
}

export default Post;
