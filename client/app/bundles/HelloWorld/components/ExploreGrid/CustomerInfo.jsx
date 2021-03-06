import React from 'react';

export default class AuthorInfo extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {visible: false};
  }
  toggleClick = () => {
    this.setState({visible: !this.state.visible});
  }
  sendStatistic(type){
    let user_id = this.props.user.id;
    let current_user_id = currentUser && currentUser.id;
    if (current_user_id != user_id){
    console.log('send statistic', type, user_id);
      $.ajax({
        url: Routes.statistics_path(),
        type: 'POST',
        data: {
          statistic: {
            type: type,
            user_id: user_id
          }
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      });
    }
  }
  render(){
    let user = this.props.user;
    if (user.vk_id){
      var vk_rendered = (
        <a
          href={'https://vk.com/' + user.vk_id}
          onClick={this.sendStatistic.bind(this, 'vk_click')}
          target='_blank'>
          <img src= '/images/social_vk.png' />
        </a>
      );
    }
    if (user.facebook_id){
      var facebook_rendered = (
        <a
          href={'https://facebook.com/' + user.facebook_id}
          onClick={this.sendStatistic.bind(this, 'facebook_click')}
          target='_blank'>
          <img src= '/images/social_facebook.png' />
        </a>
      );
    }
    if (user.instagram_id){
      var insta_rendered = (
        <a
          href={'https://instagram.com/' + user.instagram_id}
          onClick={this.sendStatistic.bind(this, 'instagram_click')}
          target='_blank'>
          <img src= '/images/social_insta.png' />
        </a>
      );
    }
    if (this.state.visible) {
      if (currentUser) {
        var author_info_rendered = (
          <div className='contact-saler'>
            <h4><span>{user.phone}</span></h4>
            <div className='social-networks'>
              <p>
                {vk_rendered}
                {facebook_rendered}
                {insta_rendered}
              </p>
            </div>
          </div>
        );
      } else {
        var author_info_rendered = (
          <div className='contact-saler'>
            <a href='http://trenly.ru/welcome'>Войдите</a> на Trenly, чтобы связаться с продавцом
          </div>
        );
      }
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
}
