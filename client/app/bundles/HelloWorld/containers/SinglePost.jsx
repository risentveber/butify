import React from 'react'

import PostPhotosView from '../components/common/PostPhotosView'
import CommentBox from '../components/ExploreGrid/CommentBox'
import AuthorView from '../components/SinglePost/AuthorView'

export default class SinglePost extends React.Component {
  //BEGIN***************************************************DECLARE
  // propTypes: {
  //   group_id: React.PropTypes.number,
  //   //show_panel: React.PropTypes.boolean,
  //   posts_url: React.PropTypes.string.isRequired
  // },
  constructor(props, context){
    super(props, context);

    this.state = {post: props.post};

    console.log("Props for single post", props);
  }
  componentDidMount = ()=>{
    console.log('Post Info', this.props.post);
  }
  createComment = (text) => {
    CI('PostBox::createComment', post_id, text);
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == post_id){
        n.comments.unshift({
          id: Date.now(),
          text: text,
          author: currentUser
        })
      }
      return n;
    });
    this.setState({posts: newPosts});
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: {
        comment: {
          text: text,
          commentable_id: post_id,
          commentable_type: 'Post'
        }
      },
      success: function(data) {
        this.loadPostsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  removeComment = (comment_id) => {
    CI('PostBox::removeComment', post_id, comment_id);
    var delete_url;
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == post_id){
        n.comments = n.comments.filter(function(c){
          if (c.id == comment_id)
            delete_url = c.url;
          return c.id != comment_id;
        });
      }
      return n;
    });
    this.setState({posts: newPosts});
    $.ajax({
      url: delete_url,
      type: 'DELETE'
    });
  }
  updateComment = (comment_id, text) => {
    CI('PostBox::removeComment', post_id, comment_id, text);
    var comment_url;
    var newPosts = this.state.posts.map(function (n) {
      if (n.id == post_id){
        n.comments = n.comments.map(function(c){
          if (c.id == comment_id){
            comment_url = c.url;
            c.text = text;
          }
          return c;
        });
      }
      return n;
    });
    this.setState({posts: newPosts});
    $.ajax({
      url: comment_url,
      type: 'PATCH',
      data: {
        comment : {
          text: text
        }
      }
    });
  }
  likeClick = () => {
    var post = this.state.post;

    if (post.current_like){
      post.likes -= 1;
      post.current_like = false;
      post.current_like_just = false;
    } else {
      post.likes += 1;
      post.current_like = true
      post.current_like_just = true;
    }

    this.setState({post: post});
    $.ajax({
      url: likedPost.like_path,
      type: 'PUT',
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }
  //END*****************************************************HELPERS
  render() {
    let tags = this.props.post.tags.map((name, i) => {
      return <a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>
    });
    return (
      <div className='post-container'>
        <div className='post card-sp'>
          <AuthorView
            post={this.props.post}
            author={this.props.post.author}
            city_name={this.props.post.city_name}
            time={this.props.post.time}
            can_edit={this.props.post.can_edit}
            can_remove={this.props.post.can_remove}
            removeClick={this.removeClick}
            editClick={this.editClick}/>
          <div className='post-content'>
            <PostPhotosView
              post={this.props.post}/>
            <div className='wrap-post-tags-sp'>
              <p className='tags-sp'>{tags}</p>
            </div>
            <CommentBox
              likeClick={this.likeClick}
              basketClick={this.basketClick}
              createComment={this.createComment}
              removeComment={this.removeComment}
              updateComment={this.updateComment}
              comments={this.props.post.comments}
              likes={this.props.post.likes}
              baskets_count={this.props.post.baskets_count}
              current_like_just={this.props.post.current_like_just||false}
              current_basket={this.props.post.current_basket}
              current_like={this.props.post.current_like}
              />
          </div>
        </div>
      </div>
    );
  }
}
