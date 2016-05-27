import React from 'react'

class CommentText extends React.Component{
  componentDidMount() {
    var node = this.refs.text;

    $(node).emojiarea({
      buttonLabel: '&#9786;',
      buttonPosition: 'before',
    });

    $(node).next().next().on('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    var node = this.refs.text;
    $(node).next().next().off('keydown', this.handleKeyDown);
  }
  handleKeyDown = (e) => {
    var ENTER = 13;
    if( e.keyCode == ENTER ) {
      e.preventDefault();
      var node = this.refs.text;
      this.props.updateComment(node.value);
    }
  }
  render() {
    return (
      <div>
      <textarea
        ref='text'
        className="form-control textarea-form-control-comment"
        placeholder='Введите комментарий'
        defaultValue={this.props.text}/>
      </div>
    );
  }
}

let createIcon = (emoji) => {
  var filename = $.emojiarea.icons[emoji];
  var path = $.emojiarea.path || '';
  if (path.length && path.charAt(path.length - 1) !== '/') {
    path += '/';
  }
  return '<img class="img-emoji" src="' + path + filename + '">';
};

export default class Comment extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      editable: false
    };
  }
  componentDidMount() {
    if (CLIENTSIDE && this.refs.ceditable) {
      var node = this.refs.ceditable;
      $(node).emojiarea({
        button: false,
        wysiwyg: false
      });
    };
  }
  removeClick = () => {
    this.props.removeComment(this.props.comment.id)
  }
  editClick = () => {
    this.setState({ editable: true });
  }
  updateComment = (text) => {
    console.info('Comment::updateComment', text);
    if (!text.trim()) return;
    this.setState({
      editable: false
    });
    this.props.updateComment(this.props.comment.id, text);
  }
  render(){
    var style = {
      background: 'url(' + this.props.comment.author.avatar + ') no-repeat',
      backgroundSize: 'cover'
    };
    var main_part;
    if (this.state.editable){
      main_part = (
        <div className="object-text">
          <div className="object-maintext">
            <a href={this.props.comment.author.url}>{this.props.comment.author.name}</a>
            <span className="status-user-line">
              <span> • </span>
              <span> </span>
              <span>{this.props.comment.author.type}</span>
            </span>
            <span className="post-autor-data">
              <span> • </span>
              <span>{this.props.comment.time}</span>
            </span>
          </div>
          <CommentText
            key='textarea'
            updateComment={this.updateComment}
            text={this.props.comment.text}/>
        </div>
      );
    } else {
      var edit_button, remove_button, menu;
      if (this.props.comment.can_edit){
        edit_button = <li><a onClick={this.editClick}>Редактировать</a></li>
      }
      if (this.props.comment.can_remove){
        remove_button = <li><a onClick={this.removeClick}>Удалить</a></li>
      }
      if (remove_button || edit_button){
        menu = (
          <span>
            <span className = 'sign-dots-menu action-angle' data-toggle="dropdown">•••</span>
            <ul className="dropdown-menu" role="menu">
              {edit_button}
              {remove_button}
            </ul>
          </span>
        );
      }
      var final_text = this.props.comment.text;
      if (CLIENTSIDE){
        var emojis = $.emojiarea.icons;
        for (var key in emojis) {
          if (emojis.hasOwnProperty(key)) {
            final_text = final_text.replace(new RegExp(key, 'g'), createIcon(key));
          }
        }
      }
      main_part = (
        <div className='object-text'>
          <div className='object-maintext'>
            <a href={this.props.comment.author.url}>{this.props.comment.author.name}</a>
            <span className="post-autor-data"><span > • </span>
              <span>
              {this.props.comment.time}
              </span>
            </span>
            {menu}
          </div>
          <div className='text-unit-post-comments' ref='ceditable'
          dangerouslySetInnerHTML={{__html: final_text}}/>
        </div>
      );
    }

    return (
      <div className='unit-post-comments'>
        <div className='preview-object'>
          <div className='preview-object-avatar-comment' style={style}>
          </div>
          <div className='preview-object-info-mini'>
            {main_part}
          </div>
          <div className='clearboth'>
          </div>
        </div>
      </div>
    )
  }
}

