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
  render() {
    return (
      <div>
        <PostHeader name={this.props.name} time={this.props.time} isComment={false} />
        <PostContent content={this.props.content} />
        <PostFooter likes={this.props.likes} dislikes={this.props.dislikes} isComment={false} />
      </div>
    );
  }
}

export default Post;
