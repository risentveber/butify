import React, { PropTypes } from 'react';
import PublicationTimeBlock from './PublicationTimeBlock'
import _ from 'lodash';

export default class StaticPostAuthor extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      publicationInfoIsVisible: false
    }

    _.bindAll(this, 'publicationInfoClick');
  }
  publicationInfoClick(){
    this.setState({publicationInfoIsVisible: !this.state.publicationInfoIsVisible})
    this.props.onChangePublicatedAt({target :{value: null}});
  }
  render(){
    var description;
    var post = this.props.post;

    if (this.state.publicationInfoIsVisible){
      if (post.city_name) {
        description = post.city_name + ', ';
      }
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
      </div>
    );
  }
}