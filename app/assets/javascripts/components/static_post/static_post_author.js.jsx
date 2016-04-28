var StaticPostAuthor = React.createClass({
  getInitialState() {
    return {publicationInfoIsVisible: false}
  },
  publicationInfoClick(){
    this.setState({publicationInfoIsVisible: !this.state.publicationInfoIsVisible})
    this.props.onChangePublicationTime({target :{value: null}});
    this.props.onChangePublicationDate({target :{value: null}});
  },
  render: function(){
    var description;
    var post = this.props.post;
    if (post.city_name) {
      description = post.city_name + ', ' + post.time
    } else {
      description = post.time
    };
    if (this.state.publicationInfoIsVisible){
      var publicationInfo = (
        <PublicationTimeBlock
          publication_date={this.props.post.publication_date}
          publication_time={this.props.post.publication_time}
          onChangePublicationTime={this.props.onChangePublicationTime}
          onChangePublicationDate={this.props.onChangePublicationDate}
        />);
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
              <div className='post-autor-city'>{description}
                {publicationInfo}&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
                <a onClick={this.publicationInfoClick}>Отсроченная публикация</a>
              </div>
            </div>
        </div>
      </div>
    );
  }
});
