var StaticPostAuthor = React.createClass({
  render: function() {
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
                <select>
                  <option>Завтра</option>
                  <option>Послезавтра</option>
                  <option>Через 3 день</option>
                  <option>Через 4 день</option>
                  <option>Через 5 день</option>
                  <option>Через 6 день</option>
                  <option>Через 7 день</option>
                </select>
                </span> 
                <span>
                  в 
                  <select>
                    <option>00:00</option>
                    <option>01:00</option>
                    <option>02:00</option>
                    <option>03:00</option>
                    <option>04:00</option>
                    <option>05:00</option>
                    <option>06:00</option>
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                    <option>23:00</option>
                  </select>
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




