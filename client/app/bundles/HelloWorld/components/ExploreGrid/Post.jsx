import React from 'react';
import sanitizeHtml from 'sanitize-html';
import DiscountBlock from './DiscountBlock';
import AdminBlock from './AdminBlock';

import _ from 'lodash';

export default class Post extends React.Component{
  constructor(props, context){
    super(props, context);
    this.state = { adminPanelIsVisible: false }
  }
  componentDidMount = () => {
    if (window.currentUser && window.currentUser.admin) {
      this.setState({ adminPanelIsVisible: true })
    }
  }
  onLikeClick = () => {
    this.props.like_post(this.props.post.id);
  }
  onShowClick = () => {
    this.props.showClick(this.props.post.id);
  }
  offer = () => {
    var url = '/desires/' + this.props.desire_id + '/offers'
    $.ajax({
      url: url,
      type: 'POST',
      data: {
        post_id: this.props.post.id
      },
      success: function(data) {
        Turbolinks.visit('/desires');
      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  }
  render(){
    let post = this.props.post;
    var image, link_rendered;

    var photo_count = post.photos.length;
    if (photo_count > 1)
      var all_images_count = <span className="explore-num-photo">{photo_count}</span>

<<<<<<< HEAD
=======
    if (post.moderated)
      var moderate_sign = <span className='explore-moderate-sign'><img src='/images/correct-signal_grey.png' /></span>

>>>>>>> b9270ad48969724928e177970f8fb34ad4904b8e
    image = (
      <div className='img-show-post-explore'>
        <img onClick={this.onShowClick} src={post.photos[0] && post.photos[0].url}/>
        {all_images_count}
<<<<<<< HEAD
=======
        {moderate_sign}
>>>>>>> b9270ad48969724928e177970f8fb34ad4904b8e
      </div>
    );

    var rendered_likes;
    if (post.current_like) {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Лайк'
            data-toggle="tooltip"
            data-placement="top"
            src='/images/like_active.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    } else {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Лайк'
            data-toggle="tooltip"
            data-placement="top"
            src='/images/like_grey.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    }
    var text = sanitizeHtml(post.text, {allowedTags: ['div', 'br']});

    var tags = post.tags.map((name, i) => {<a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>})

    if (this.state.adminPanelIsVisible){
      var admin_block = (
        <AdminBlock
          recommended={post.recommended}
          visible={post.visible}
          moderated={post.moderated}
          url={post.url}
          values={post.categories}/>
      );
      var post_id = post.id;
    }
    if (this.props.desire_id && !this.props.desire_count && !post.published_at){
      var offer_block = (
        <div className='explore-offer-block'><button onClick={this.offer} className='btn btn-xs btn-st'>Предложить</button></div>
      );
    }
    else if(this.props.desire_id){
      var offer_block = (
        <div className='explore-offer-block'>"Вы уже предложили товар на это желание"</div>
      );
      var offer_hidden = "hidden-element"
    }
    if(post.linkdata.description)
      var title_link = <h3 className='title'>{post.linkdata.description}</h3>
    if(tags.length)
      var tags_rendered = <p className='tags-sp'>{tags}</p>
    if(text)
      var text_rendered = <p className='text' dangerouslySetInnerHTML={{__html: text}}></p>
    if (post.sitelink)
      var sitelink_rendered = (
        <a href={post.sitelink} target='_blank'>{post.sitelink.split('/')[2]}</a>
      );
    if (post.published_at)
      var css_class = 'half-opacity';
    css_class = css_class + " " + offer_hidden
<<<<<<< HEAD
=======

>>>>>>> b9270ad48969724928e177970f8fb34ad4904b8e
    return(
        <figure className={css_class}>
          <div className='wrap-figure-explore-post'>
            {image}
            <figcaption className='content-board border-b-radius'>
            <div className='main-contain'>
              {link_rendered}
              {title_link}
              <h4>{post.title}</h4>
            </div>
            {admin_block}
            {offer_block}
            <div className='price-explore-post'>
              <DiscountBlock price={post.price} discount_price={post.discount_price}/>
            </div>
            <footer className='border-b-radius'>
              <div className='delicious-like'>
                <div className='show-post'>
                  <div className="avatar-explore" style={{
                    background: 'url(' + post.author.avatar + ') no-repeat',
                    backgroundSize:'cover'}}>
                  </div>
                  <span>
                    <a href={post.author.url}>{post.author.name}</a>
                    <p>
                      {sitelink_rendered}
                    </p>
                  </span>
                </div>
                <div className='action-of-post'>
                  <div>
                    <span>
                      <img
                        title='Комментарий'
                        data-toggle="tooltip"
                        data-placement="top"
                        src='/images/comment3.png' />
                      <span>
                        {post.comments.length || ''}
                      </span>
                    </span>
                  </div>
                  <div>
                    {rendered_likes}
                  </div>
                </div>
              </div>
            </footer>
            <div className='clearboth'>
            </div>
            </figcaption>
          </div>
        </figure>
    );
  }
}
