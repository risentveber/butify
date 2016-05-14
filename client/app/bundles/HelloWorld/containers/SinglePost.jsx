import React from 'react'

import sanitizeHtml from 'sanitize-html'
import PostPhotosView from '../components/common/PostPhotosView'
import CommentBox from '../components/ExploreGrid/CommentBox'
import AuthorView from '../components/SinglePost/AuthorView'
import DiscountBlock from '../components/ExploreGrid/DiscountBlock';
import CustomerInfo from '../components/ExploreGrid/CustomerInfo';

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
    if (!this.props.post) return null;
    console.log(this.props.post)
    var post = this.props.post;
    var author = post.author;
    var rendered_categories = this.props.post.category_names.map(function(name, i){
      return (<h5 key={i}><a key={i} href={'/explore?category_name=' + name}>{name}</a></h5>);
    });

    var tags = this.props.post.tags.map((name, i) => {
      return (<a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>);
    });
    if (tags.length > 0)
      var tags_block = (
        <div className='modal-tags'>
          <h5>Теги</h5>
          <p className="tags-sp">
            {tags}
          </p>
        </div>
      );

    var classname, classname_img;
    var like_image_path;
    if (this.props.post.current_like){
      like_image_path = '/images/like_active.png';
      classname = 'post-like post-like-active';
      if (this.props.post.current_like_just)
        classname_img += ' post-like-active-animate';
    } else {
      like_image_path = '/images/like_grey.png';
      classname = 'post-like';
    }

    if (post.sitelink)
      var sitelink_rendered = (
        <a href={post.sitelink} target='_blank'>{post.sitelink.split('/')[2]}</a>
      );

    if (post.can_edit)
      var edit_link_rendered = (
        <li>
          <a href={this.props.post.edit_url}>Редактировать</a>
        </li>
      );
    if (post.can_remove)
      var remove_link_rendered = (
        <li>
          <a onClick={this.removeClick}>Удалить</a>
        </li>
      );
    var time_rendered
    if (post.published_at) {
      time_rendered = "будет опубликовано " + post.published_at;
    } else {
      time_rendered = post.time;
    }
    return (
      <div className='wrap-the-post card-butify'>
        <div className='the-post-content'>
          <div className='modal-header'>
            <AuthorView
              post={this.props.post}
              author={this.props.post.author}
              city_name={this.props.post.city_name}
              time={this.props.post.time}
              can_edit={this.props.post.can_edit}
              can_remove={this.props.post.can_remove}
              removeClick={this.removeClick}
              editClick={this.editClick}/>
          </div>
          <div className='modal-body'>
              <div className='modal-post-content'>
                <PostPhotosView
                  post={this.props.post}/>
                <div className='usual-post-contant'>
                  <div className = 'title-post'>
                    <h3>{this.props.post.title}</h3>
                  </div>
                  <div className = 'usual-post-text action-create-element-post'>
                    <div
                      className = 'usual-post-text-text'
                      dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(this.props.post.text, {allowedTags: ['div', 'br']})
                      }}
                    />
                  </div>
                </div>
                <CommentBox
                  hide_like={true}
                  likeClick={this.likeClick}
                  basketClick={this.basketClick}
                  createComment={this.createComment}
                  removeComment={this.removeComment}
                  updateComment={this.updateComment}
                  comments={this.props.post.comments}
                  likes={this.props.post.likes}
                  baskets_count={post.baskets_count}
                  current_like_just={post.current_like_just||false}
                  current_basket={post.current_basket}
                  current_like={post.current_like}
                  />
              </div>
              <div className='modal-atributes'>
                <div className='likes-and-views likes-and-price'>
                  <ul>
                    <li className='likes'>
                      <img src={like_image_path} onClick={this.likeClick} className={classname_img}/> <span className='num-likes'>{post.likes || ''}</span>
                    </li>
                    <li>
                      <DiscountBlock price={post.price} discount_price={post.discount_price} showPost={true}/>
                    </li>
                    <li>
                      <span className='show-post-site-link'>
                        {sitelink_rendered}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className='clearboth'>
                </div>
                <div className='modal-categories'>
                  {rendered_categories}
                </div>
                {tags_block}
                <CustomerInfo user={this.props.post.author}/>
              </div>
              <div className='clearboth'>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
