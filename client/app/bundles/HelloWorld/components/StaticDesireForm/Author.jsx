import React from 'react';

export default class Author extends React.Component {
  render(){
    var description;
    var desire = this.props.desire;
    if (desire.city_name) {
      description = desire.city_name + ', ' + desire.time
    } else {
      description = desire.time
    };
    return (
      <div className="post-autor">
        <a href="#">
          <div className="usual-avatar" style={{
              background: 'url(' + desire.author.avatar + ') no-repeat',
              backgroundSize:'cover'
            }}>
          </div>
          <div className="post-autor-info">
            <h4 className="modal-title" id="myModalLabel">{desire.author.name}</h4>
            <div className='city-time'>
              {description}
            </div>
          </div>
        </a>
      </div>
    );
  }
}
