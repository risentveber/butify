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
          sitelink:'',
          text:'',
          category_ids: [],
          tags:[],
          photos: [],
        },
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
  onChangeSitelink(event){
    var post = this.state.post;
    post.sitelink = event.target.value;
    this.setState({post: post});
  },
  onChangeText(event){
    var post = this.state.post;
    post.text = event.target.value;
    this.setState({post: post});
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
  changeCategoryIds(ids){
    var post = this.state.post;
    post.category_ids = ids;
    this.setState({
      post: post
    });
  },
  render: function() {
    console.log(this.state.time)
    var button_disabled;
    console.log('Количество категорий', this.state.post.category_ids)//.length )
    if (this.state.post.photos.length == 0 ||
     this.state.post.category_ids && this.state.post.category_ids.length == 0
     || !this.state.post.category_ids) {
      button_disabled =  true;
    } else {
      button_disabled = false;
    };
    return (
      <div className='card-butify creaet-new-post'>
        <StaticPostAuthor
          onChangeSitelink={this.onChangeSitelink}
          city_name={this.state.post.city_name}
          sitelink={this.state.post.sitelink}
          author={this.state.post.author}
          time={this.state.post.time}/>
        <StaticPostMainPart
          changeCategoryIds={this.changeCategoryIds}
          addPhoto={this.addPhoto}
          removePhoto={this.removePhoto}
          setTags={this.setTags}
          onChangeText={this.onChangeText}
          post={this.state.post}/>
        <div className='clearboth' />
        <div className="modal-footer">
          <button
            type="button"
            disabled={button_disabled || this.state.disabled}
            onClick={this.submitForm}
            className="btn btn-primary btn-st">
            Опубликовать
          </button>
        </div>
      </div>
    );
  }
});
