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
  }
  createComment = (text) => {
    let post = this.state.post;
    post.comments.unshift({
      id: Date.now(),
      text: text,
      author: currentUser
    });

    this.setState({post: post});
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: {
        comment: {
          text: text,
          commentable_id: post.id,
          commentable_type: 'Post'
        }
      },
      success: (data) => {
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }
  removeComment = (comment_id) => {
    let post = this.state.post;

    post.comments = post.comments.filter(c => c.id != comment_id);

    this.setState({post: post});
    $.ajax({
      url: Routes.comment_path(comment_id),
      type: 'DELETE'
    });
  }
  updateComment = (comment_id, text) => {
    let post = this.state.post;

    post.comments = post.comments.map((c) =>{
      if (c.id == comment_id){
        c.text = text;
      }
      return c;
    });

    this.setState({post: post});
    $.ajax({
      url: Routes.comment_path(comment_id),
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
      url: Routes.like_post_path(post.id),
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
