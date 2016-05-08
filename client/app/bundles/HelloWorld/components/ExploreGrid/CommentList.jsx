import React from 'react';
import Comment from './Comment'

export default class CommentList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show_all: false
    };
  }
  showMoreClick = () => {
    this.setState({show_all: true});
  }
  hideMoreClick =() => {
    this.setState({show_all: false});
  }
  render() {
    var comments = this.props.comments;
    if (!this.state.show_all){
      comments = comments.slice(-3);
    }
    comments = comments.map(function (c) {
      return (
        <Comment
          key={c.id}
          updateComment={this.props.updateComment}
          removeComment={this.props.removeComment}
          comment={c}/>
      );
    }.bind(this));
    var button;
    if (this.props.comments.length > 3){
      if (this.state.show_all){
        button = (
          <div className='show-all-comments'>
            <span onClick={this.hideMoreClick}>Скрыть комментарии</span>
          </div>
        );
      } else {
        button =(
          <div className='show-all-comments'>
            <span onClick={this.showMoreClick}>Показать все комментарии</span>
          </div>
        );
      }
    }
    return(
      <div>
        {button}
        <div className='post-comments'>
          {comments}
        </div>
      </div>
    )
  }
}
