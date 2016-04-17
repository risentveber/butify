var StaticPostAuthor = React.createClass({
  render: function() {
    var description;
    if (this.props.city_name) {
      description = this.props.city_name + ', ' + this.props.time
    } else {
      description = this.props.time
    };
    console.log(this.props);
    return (
      <div className="modal-header">
        <div className='post-autor'>
            <div className="usual-avatar" style={{
              background: 'url(' + this.props.author.avatar + ') no-repeat',
              backgroundSize:'cover'
            }}>
            </div>
            <div className='post-autor-info'>
              <a><h4 className="modal-title" id="myModalLabel">{this.props.author.name}</h4></a>
              <div>{description}</div>
            </div>
        </div>
      </div>
    );
  }
});

// <TagSelect
//             setTags={this.props.setTags}
//             values={this.props.post.tags}/>




