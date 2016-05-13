import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import sanitizeHtml from 'sanitize-html'
import PostPhotosView from '../common/PostPhotosView';
import CommentBox from './CommentBox';
import DiscountBlock from './DiscountBlock';
import CustomerInfo from './CustomerInfo';

export default class ShowPost extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      show_author_info:false
    }
  }
  removeComment = (comment_id) => {
    this.props.removeComment(this.props.post.id, comment_id);
  }
  likeClick = () => {
    this.props.likePost(this.props.post.id);
  }
  createComment = (text) => {
    this.props.createComment(this.props.post.id, text);
  }
  updateComment = (comment_id, text) => {
    this.props.updateComment(this.props.post.id, comment_id, text);
  }
  showAuthorInfoClick = () => {
    this.setState({show_author_info: true});
  }
  removeClick = () => {
    $.ajax({
      url: this.props.post.url,
      type: 'DELETE',
      success: function () {
        Turbolinks.visit(window.location)
      }
    });
  }
  render(){
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
      <Modal
        dialogClassName='modal-dialog modal-dialog-show-post'
        show={Boolean(this.props.post)}
        onHide={this.props.onHide}>
          <div className='close-explore-post'><button type="button" className="close" onClick={this.props.onHide}>&times;</button></div>
          <div className="modal-header">
            <div className='post-autor'>
              <a href={author.url}>
                <div className="usual-avatar" style={{
                  background: 'url(' + author.avatar + ') no-repeat',
                  backgroundSize:'cover'}}>
                </div>
                <div className='post-autor-info'>
                  <h4 className="modal-title" id="myModalLabel">{author.name}</h4>
                  <div>{post.city_name}, {time_rendered}</div>
                </div>
              </a>
              <div className="action-angle post-action">
                <div className="btn-group">
                  <span className="sign-dots-menu" data-toggle="dropdown">•••</span>
                  <ul className="dropdown-menu blue-background-dropdown-menu" role="menu">
                    {edit_link_rendered}
                    {remove_link_rendered}
                    <li>
                      <a>Пожаловаться</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className='modal-post-content'>
              <PostPhotosView
                post={post}/>
              <div className='usual-post-contant'>
                <div className = 'title-post'>
                  <h3>{post.title}</h3>
                </div>
                <div className = 'usual-post-text action-create-element-post'>
                  <div
                    className = 'usual-post-text-text'
                    dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(post.text, {allowedTags: ['div', 'br']})
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
          </div>
          <div className="modal-footer">
          </div>
      </Modal>
    );
  }
}
