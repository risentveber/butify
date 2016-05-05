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
  },
  submitForm(){
    var post = this.state.post;
    var photo_ids = post.photos.map(function(p){ return p.id })
    var url = this.props.post ? this.props.url : '/posts'
    var request_type = this.props.post ? 'PATCH' : 'POST'
    var sitelink = post.sitelink;
    if (sitelink)
      sitelink = sitelink.trim();
    if (sitelink && sitelink.slice(0, 4) != 'http')
      sitelink = 'http://' + sitelink;
    console.log(sitelink);
    this.setState({disabled: true});
    var self = this;
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
      success: function(data) {
        Turbolinks.visit(window.currentUser.url);
      },
      error: function(xhr, status, err) {
        self.setState({disabled: false});
        console.error(self.props.url, status, err.toString());
      }
    });
  },
  mouseOverTips(){
    alert('sdf');
  },
  changeUniversal(propertyName, event){
    var post = this.state.post;
    console.log(propertyName, post[propertyName] = event.target.value);
    this.setState({post: post});
  },
  onChangeSitelink(event){
    this.changeUniversal('sitelink', event);
  },
  onChangePublicatedAt(event){
    console.log(event.target.value)
    this.changeUniversal('published_at', event);
  },
  onChangeText(event){
    this.changeUniversal('text', event);
  },
  onChangeTitle(event){
    this.changeUniversal('title', event);
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
          <button
            type="button"
            disabled={this.contentIsInvalid() || this.state.disabled}
            onClick={this.submitForm}
            data-container="body"
            data-toggle="popover"
            data-placement="bottom"
            data-content="Vivamus
sagittis lacus vel augue laoreet rutrum faucibus."
            id='publish-item'
            className="btn btn-primary btn-st">
            Опубликовать
          </button>
        </div>
      </div>
    );
  }
});
