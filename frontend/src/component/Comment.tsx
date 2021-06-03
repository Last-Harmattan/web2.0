import React from 'react';
import './Components.css';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

interface CommentProps {
  name: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
}

class Comment extends React.Component<CommentProps, {}> {
  render() {
    return (
      <div className='Comment'>
        <PostHeader name={this.props.name} time={this.props.time} isComment={true} />
        <PostContent content={this.props.content} />
        <PostFooter likes={this.props.likes} dislikes={this.props.dislikes} isComment={true} />
      </div>
    );
  }
}

export default Comment;
