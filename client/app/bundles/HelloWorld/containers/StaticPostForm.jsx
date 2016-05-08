import React, { PropTypes } from 'react';
import StaticPostAuthor from '../components/StaticPostForm/StaticPostAuthor';
import StaticPostMainPart from '../components/StaticPostForm/StaticPostMainPart';
import _ from 'lodash';

// NOT FOR PRERENDER USE
export default class StaticPostForm extends React.Component {
  constructor(props, context) {
    super(props, context);

      if (this.props.post) {
      this.state = {
        post: this.props.post,
        disabled: false
      }
    } else
      this.state = {
        post: {
          title: '',
          author: window.currentUser,
          city_id: window.currentUser.city_id,
          time: this.props.time_now,
          city_name: window.currentUser.city_name,
          post_type: 'photo',
          price: '',
          discount_price: '',
          sitelink:'',
          text:'',
          category_ids: [],
          tags:[],
          photos: [],
        },
        discountIsShown: false,
        disabled: false
      };

   _.bindAll(this,
    'addPhoto',
    'removePhoto',
    'submitForm',
    'changeUniversal',
    'onChangeSitelink',
    'onChangePrice',
    'onChangeTitle',
    'onChangeText',
    'onChangeDiscountPrice',
    'onChangePublicatedAt',
    'onChangeCategoryIds',
    'setTags',
    'showDiscount',
    'contentIsInvalid'
    );
  }

  submitForm(){
    if(this.contentIsInvalid()){
      this.setState({disabled: true});
    }
    else{
      var post = this.state.post;
      var photo_ids = post.photos.map((p) => { return p.id })
      var url = this.props.post ? this.props.url : '/posts'
      var request_type = this.props.post ? 'PATCH' : 'POST'
      var sitelink = post.sitelink;
      if (sitelink)
        sitelink = sitelink.trim();
      if (sitelink && sitelink.slice(0, 4) != 'http')
        sitelink = 'http://' + sitelink;
      console.log(sitelink);
      $.ajax({
        url: url,
        type: request_type,
        data: {
          post: {
            city_id: post.city_id,
            published_at: post.published_at,
            sitelink: sitelink,
            text: post.text,
            title: post.title,
            category_ids: post.category_ids,
            tags: post.tags,
            photo_ids: photo_ids,
            price: post.price,
            discount_price: post.discount_price,
          }
        },
        success: (data) => {
          Turbolinks.visit(window.currentUser.url);
        },
        error: (xhr, status, err) => {
          this.setState({disabled: false});
          console.error(this.props.url, status, err.toString());
        }
      });
    }
  }
  changeUniversal(propertyName, event){
    var post = this.state.post;
    console.info(propertyName, post[propertyName] = event.target.value);
    this.setState({post: post});
  }
  onChangeSitelink(event){
    this.changeUniversal('sitelink', event);
  }
  onChangePublicatedAt(event){
    console.log(event.target.value)
    this.changeUniversal('published_at', event);
  }
  onChangeText(event){
    this.changeUniversal('text', event);
  }
  onChangeTitle(event){
    this.changeUniversal('title', event);
  }
  onChangePrice(event){
    this.changeUniversal('price', event);
  }
  onChangeDiscountPrice(event){
    this.changeUniversal('discount_price', event);
  }
  setTags(values){
    let post = this.state.post;
    post.tags = values;
    this.setState({
      post: post
    });
  }
  addPhoto(data){
    let post = this.state.post;
    post.photos.push(data);
    this.setState({
      post: post
    });
  }
  removePhoto(id){
    let post = this.state.post;
    post.photos = post.photos.filter( p => p.id != id );
    this.setState({
      post: post
    });
  }
  onChangeCategoryIds(ids){
    let post = this.state.post;
    post.category_ids = ids;
    this.setState({
      post: post
    });
  }
  contentIsInvalid(){
    var post = this.state.post;
    return (
      post.photos.length == 0 ||//не добавлено фото
      post.category_ids && post.category_ids.length == 0 || !post.category_ids || // не указана ни одна из категорий
      !post.price || //не заполнена цена
      this.state.discountIsShown && !post.discount_price //не заполнена скидка
      //post.tags && post.tags.length == 0 || !post.tags || //не выбраны теги
      //!trim(post.text) || //не заполнено описание
      //!trim(post.sitelink) //не заполнена ссылка
    )
  }
  showDiscount(){
    this.setState({
      discountIsShown: true
    });
  }
  render() {
    if (this.state.disabled){
      var message_to_user = (
        <span className='message-to-user contrast-color-text'>Публикация обязательно должна содержать изображение, цену и категорию!</span>
      );
    }
    console.log('begin render')
    return (
      <div className='card-butify creaet-new-post'>
        <StaticPostAuthor
          onChangeSitelink={this.onChangeSitelink}
          onChangePublicatedAt={this.onChangePublicatedAt}
          post={this.state.post}/>
        <StaticPostMainPart
          changeCategoryIds={this.onChangeCategoryIds}
          onChangePrice={this.onChangePrice}
          onChangeSitelink={this.onChangeSitelink}
          onChangeDiscountPrice={this.onChangeDiscountPrice}
          onChangeTitle={this.onChangeTitle}
          showDiscount={this.showDiscount}
          addPhoto={this.addPhoto}
          removePhoto={this.removePhoto}
          setTags={this.setTags}
          onChangeText={this.onChangeText}
          post={this.state.post}
          discountIsShown={this.state.discountIsShown || this.state.post.discount_price}/>
        <div className='clearboth' />
        <div className="modal-footer">
          {message_to_user}
          <button
            type="button"
            onClick={this.submitForm}
            id='advices-btn'
            className="btn btn-primary btn-st">
            Опубликовать
          </button>
        </div>
      </div>
    );
  }
}
