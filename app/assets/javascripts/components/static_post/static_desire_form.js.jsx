var StaticDesireForm = React.createClass({
  getInitialState() {
    if (this.props.desire) {
      return {
        desire: this.props.desire,
        disabled: false
      }
    } else
      return {
        desire: {
          title: '',
          author: window.currentUser,
          city_id: window.currentUser.city_id,
          time: this.props.time_now,
          city_name: window.currentUser.city_name,
          text: '',
          post_type: 'photo',
          photos: [],
        },
        disabled: false
      };
  },
  submitForm(){
    var desire = this.state.desire;
    var url = this.props.desire ? this.props.url : '/desires'
    var photo_ids = post.photos.map(function(p){ return p.id })
    var request_type = this.props.desire ? 'PATCH' : 'POST'
    this.setState({disabled: true});
    var self = this;
    $.ajax({
      url: url,
      type: request_type,
      data: {
        desire: {
          title: desire.title,
          text: desire.text,
          photo_ids: photo_ids,
        }
      },
      success: function(data) {
        Turbolinks.visit('/');
      },
      error: function(xhr, status, err) {
        self.setState({disabled: false});
        console.error(self.props.url, status, err.toString());
      }
    });
  },
  changeUniversal(propertyName, event){
    var desire = this.state.desire;
    console.log(propertyName, desire[propertyName] = event.target.value);
    this.setState({desire: desire});
  },
  onChangeText(event){
    this.changeUniversal('text', event);
  },
  onChangeTitle(event){
    this.changeUniversal('title', event);
  },
  addPhoto: function(data){
    var desire = this.state.desire;
    desire.photos.push(data);
    this.setState({
      desire: desire
    });
  },
  removePhoto: function(id){
    var desire = this.state.desire;
    desire.photos = desire.photos.filter(function(p){return p.id != id});
    this.setState({
      desire: desire
    });
  },
  contentIsInvalid(){
    var desire = this.state.desire;
    return (
      !desire.title
    )
  },
  render: function() {
    return (
      <div className='desire-content create-new-desire'>
        <StaticDesireAuthor
          desire={this.state.desire}/>
        <StaticDesireMainPart
          onChangeTitle={this.onChangeTitle}
          onChangeText={this.onChangeText}
          addPhoto={this.addPhoto}
          removePhoto={this.removePhoto}
          desire={this.state.desire}/>
        <div className='clearboth' />
        <div className="desire-footer">
          <button
            type="button"
            disabled={this.contentIsInvalid() || this.state.disabled}
            onClick={this.submitForm}
            className="btn btn-primary btn-st">
            Разместить желание
          </button>
        </div>
      </div>
    );
  }
});
