var StaticPostAuthor = React.createClass({
  componentDidMount(){
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    $(this.refs.publication_time).clockpicker({donetext: 'Готово'});
    $(this.refs.publication_date).datepicker({autoclose: true, language: 'ru', startDate: Date(), endDate: endDate});
  },
  render: function(){
    var description;
    if (this.props.city_name) {
      description = this.props.city_name + ', ' + this.props.time
    } else {
      description = this.props.time
    };
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
              <div className='post-autor-city'>{description}
              <span>
                <input ref='publication_date'/>
              </span>
                <span>
                  в
                <input type="text" ref='publication_time' className="form-control"/>
                </span> &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;<a>Опубликовать передним числом</a></div>
            </div>
        </div>
      </div>
    );
  }
});

// <TagSelect
//             setTags={this.props.setTags}
//             values={this.props.post.tags}/>




