var StaticPostForm = React.createClass({
  getInitialState() {
    if (this.props.post) {
      return {
        post: this.props.post,
        disabled: false
      }
    } else
      return {
        post: {

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
  },
  submitForm(){
    var post = this.state.post;
    var photo_ids = post.photos.map(function(p){ return p.id })
    post.photo_ids = photo_ids;
    var url = this.props.post ? this.props.url : '/posts'
    var request_type = this.props.post ? 'PATCH' : 'POST'
    this.setState({disabled: true});
    var self = this;
    console.log('отправка', post.sitelink);
    $.ajax({
      url: url,
      type: request_type,
      data: {post: post},
      success: function(data) {
        window.location = '/';
      },
      error: function(xhr, status, err) {
        self.setState({disabled: false});
        console.error(self.props.url, status, err.toString());
      }
    });
  },
  changeUniversal(propertyName, event){
    var post = this.state.post;
    console.log(propertyName, post[propertyName] = event.target.value);
    this.setState({post: post});
  },
  onChangeSitelink(event){
    var post = this.state.post;
    var sitelink = event.target.value;
    if (sitelink.slice(0, 4) != 'http'){
      sitelink = 'http://' + sitelink;
    }
    post.sitelink = sitelink;
    this.setState({post: post});
  },
  onChangeText(event){
    this.changeUniversal('text', event);
  },
  onChangePrice(event){
    this.changeUniversal('price', event);
  },
  onChangeDiscountPrice(event){
    this.changeUniversal('discount_price', event);
  },
  setTags(values){
    post = this.state.post;
    post.tags = values;
    this.setState({
      post: post
    });
  },
  addPhoto: function(data){
    var post = this.state.post;
    post.photos.push(data);
    this.setState({
      post: post
    });
  },
  removePhoto: function(id){
    var post = this.state.post;
    post.photos = post.photos.filter(function(p){return p.id != id});
    this.setState({
      post: post
    });
  },
  onChangeCategoryIds(ids){
    var post = this.state.post;
    post.category_ids = ids;
    this.setState({
      post: post
    });
  },
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
  },
  showDiscount(){
    this.setState({
      discountIsShown: true
    });
  },
  render: function() {
    return (
      <div className='card-butify creaet-new-post'>
        <StaticPostAuthor
          onChangeSitelink={this.onChangeSitelink}
          city_name={this.state.post.city_name}
          sitelink={this.state.post.sitelink}
          author={this.state.post.author}
          time={this.state.post.time}/>
        <StaticPostMainPart
          changeCategoryIds={this.onChangeCategoryIds}
          onChangePrice={this.onChangePrice}
          onChangeSitelink={this.onChangeSitelink}
          onChangeDiscountPrice={this.onChangeDiscountPrice}
          showDiscount={this.showDiscount}
          addPhoto={this.addPhoto}
          removePhoto={this.removePhoto}
          setTags={this.setTags}
          onChangeText={this.onChangeText}
          post={this.state.post}
          discountIsShown={this.state.discountIsShown || this.state.post.discount_price}/>
        <div className='clearboth' />
        <div className="modal-footer">
          <button
            type="button"
            disabled={this.contentIsInvalid() || this.state.disabled}
            onClick={this.submitForm}
            className="btn btn-primary btn-st">
            Опубликовать
          </button>
        </div>
      </div>
    );
  }
});
