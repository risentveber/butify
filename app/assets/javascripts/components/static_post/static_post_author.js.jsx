var StaticPostAuthor = React.createClass({
  getInitialState() {
    return {publicationInfoIsVisible: false}
  },
  publicationInfoClick(){
    this.setState({publicationInfoIsVisible: !this.state.publicationInfoIsVisible})
    this.props.onChangePublicatedAt({target :{value: null}});
  },
  render: function(){
    var description;
    var post = this.props.post;

    if (this.state.publicationInfoIsVisible){
      description = post.city_name + ', ';
      var publicationInfo = (
        <PublicationTimeBlock
          publicated_at={this.props.post.publicated_at}
          onChangePublicatedAt={this.props.onChangePublicatedAt}
        />);
    } else {
      if (post.city_name) {
        description = post.city_name + ', ' + post.time
      } else {
        description = post.time
      };
    }
    return (
      <div className="modal-header">
        <div className='post-autor'>
            <div className="usual-avatar" style={{
              background: 'url(' + post.author.avatar + ') no-repeat',
              backgroundSize:'cover'
            }}>
            </div>
            <div className='post-autor-info'>
              <a><h4 className="modal-title" id="myModalLabel">{post.author.name}</h4></a>
              <div className='post-autor-city'>
                {description}
                {publicationInfo}&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
                <a onClick={this.publicationInfoClick}>Отсроченная публикация</a>
              </div>
            </div>
        </div>
         <div className='notification-block-future-publication'>
            <div className="notification-block">
              <span>
                Отсроченная публикация поможет сделать активность Вашей страницы постоянной!
              </span>
            </div>
          </div>
      </div>
    );
  }
});
