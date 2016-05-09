import React from 'react'

export default class PostPhotosView extends React.Component {
  render() {
    let photos = this.props.post.photos;
    photos = photos.map(function (p, index) {
      return (
        <div key={index} className="usual-post-photo action-create-element-post">
          <img className='img-usual-post-photo show-usual-post-photo' src={p.url} />
        </div>
      );
    });
    return (
      <div>
        {photos}
      </div>
    );
  }
}
