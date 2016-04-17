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
          <a>
            <div className="usual-avatar" style={{
              background: 'url(' + this.props.author.avatar + ') no-repeat',
              backgroundSize:'cover'
            }}>
            </div>
            <div className='post-autor-info'>
              <h4 className="modal-title" id="myModalLabel">{this.props.author.name}</h4>
              <div>{description}</div>
            </div>
          </a>
        </div>
      </div>
    );
  }
});

// <TagSelect
//             setTags={this.props.setTags}
//             values={this.props.post.tags}/>




