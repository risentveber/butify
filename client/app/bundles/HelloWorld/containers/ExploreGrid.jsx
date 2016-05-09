import React from 'react'
import Masonry from 'react-masonry-component';
import ShowPost from '../components/ExploreGrid/ShowPost';
import Post from '../components/ExploreGrid/Post';


export default class ExploreGrid extends React.Component {
  constructor(props, context) {
    console.log('CONSTRUCTOR', props.posts_preloaded);
    super(props, context);
    this.state = {
      limit_detected: false,
      wait_posts: false,
      posts_count: props.posts_preloaded && props.posts_preloaded.length || 40,
      posts: props.posts_preloaded || []
    };
  }
  loadPostsFromServer = () => {
    $.ajax({
      url: this.props.posts_url,
      dataType: 'json',
      data: {
        count: this.state.posts_count
      },
      cache: false,
      success: function(data) {
        var limit_detected = (data.length < this.state.posts_count);
        this.setState({
          posts: data,
          limit_detected: limit_detected
        });
        this.setState({
          wait_posts: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  removeComment = (post_id, comment_id) => {
    console.info('PostBox::removeComment', post_id, comment_id);
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
  updateComment = (post_id, comment_id, text) => {
    console.info('PostBox::removeComment', post_id, comment_id, text);
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
      },
    });
  }
  componentDidMount() {
    if (this.state.posts.length == 0){
      console.log('LOAD POST AFTER MOUNTING');
      this.loadPostsFromServer();
    }
    $(window).scroll(function() {
      var scroll_part = $(window).scrollTop()/$(document).height();
      if (scroll_part > 0.8 && !this.state.limit_detected && !this.state.wait_posts ){
        this.setState({
          posts_count: this.state.posts_count + 20,
          wait_posts: true
        });
        this.loadPostsFromServer();
        CI("scrolling", scroll_part);
      }
    }.bind(this));
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
  }
  componentWillUnmount(){
    $(window).unbind('scroll');
  }
  showClick = (id) => {
    console.log('showClick', id);
    this.setState({current_post_id: id});
  }
  like_post = (id) => {
    var posts = this.state.posts;
    var likedPost = $.grep(posts, function(e){ return e.id == id; });
    likedPost = likedPost[0];
    posts = posts.map(function(p){
      if (p.id == id){
        if (p.current_like){
          p.likes -= 1;
          p.current_like = false;
          p.current_like_just = false;
        } else {
          p.likes += 1;
          p.current_like = true
          p.current_like_just = true;
        }
      }
      return p;
    })
    this.setState({posts: posts});
    $.ajax({
      url: likedPost.like_path,
      type: 'PUT',
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  hide = () => {
    this.setState({current_post_id: undefined})
  }
  createComment = (post_id, text) => {
    console.info('PostBox::createComment', post_id, text);
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
  render() {
    var self = this;
    var childElements = this.state.posts.map(function(post, i){
      return (
        <Post
          showClick={self.showClick}
          like_post={self.like_post}
          desire_id={self.props.desire_id}
          desire_count={self.props.desire_count}
          key={i}
          post={post}/>
      );
    });
    var current_post_id = this.state.current_post_id;
    if (current_post_id){
      var currentPost = $.grep(this.state.posts, function(e){ return e.id == current_post_id; });
      currentPost = currentPost[0];
    }
    return (
      <div>
        <ShowPost
          likePost={this.like_post}
          createComment={this.createComment}
          updateComment={this.updateComment}
          removeComment={this.removeComment}
          dialogClassName='modal-dialog-new-post my-setting-modal-dialog'
          post={currentPost}
          onHide={this.hide}
        />
        <Masonry
          className={'grid-wrap'}
          elementType={'div'}
          options={{transitionDuration: 0}}
          disableImagesLoaded={false}
        >
          {childElements}
        </Masonry>
      </div>
    );
  }
}
