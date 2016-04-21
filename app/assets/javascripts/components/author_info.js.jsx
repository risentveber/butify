var AuthorInfo = React.createClass({
  getInitialState(){
    return {visible: false}
  },
  toggleClick(){
    this.setState({visible: !this.state.visible})
  },
  render() {
    var u = this.props.user
    if (u.vk_id)
      var vk_rendered = (
        <a href={'https://vk.com/' + u.vk_id} target='_blank'>
          <img src= '/images/social_vk.png' />
        </a>
      );
    if (u.facebook_id)
      var facebook_rendered = (
        <a href={'https://facebook.com/' + u.vk_id} target='_blank'>
          <img src= '/images/social_facebook.png' />
        </a>
      );
    if (u.instagram_id)
      var insta_rendered = (
        <a href={'https://instagram.com/' + u.vk_id} target='_blank'>
          <img src= '/images/social_insta.png' />
        </a>
      );
    if (this.state.visible) {
      var author_info_rendered = (
        <div className='contact-saler'>
          <h4><span>{u.phone}</span></h4>
          <div className='social-networks'>
            <p>
              {vk_rendered}
              {facebook_rendered}
              {insta_rendered}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className='modal-contact-saler'>
        <button
          onClick={this.toggleClick}
          className='btn btn-st show-contact-saler'>
          Связаться с продавцом
        </button>
        {author_info_rendered}
      </div>
    );
  }
});
