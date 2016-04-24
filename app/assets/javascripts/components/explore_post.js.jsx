const ExplorePost = React.createClass({
  onLikeClick(){
    this.props.like_post(this.props.post.id);
  },
  onShowClick(){
    //console.log('showClick')
    this.props.showClick(this.props.post.id);
  },
  render(){
    post = this.props.post;
    var image, link_rendered;

    var photo_count = post.photos.length;
    if (photo_count > 1)
      var all_images_count = <span className="explore-num-photo">{photo_count}</span>

    image = (
      <div className='img-show-post-explore'>
        <img onClick={this.onShowClick} src={post.photos[0] && post.photos[0].url}/>
        {all_images_count}
      </div>
    );

    var rendered_likes;
    if (post.current_like) {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Лайк'
            data-toggle="tooltip"
            data-placement="top"
            src='/images/like_active.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    } else {
      rendered_likes = (
        <span onClick={this.onLikeClick}>
          <img
            title='Лайк'
            data-toggle="tooltip"
            data-placement="top"
            src='/images/like_grey.png' />
          <span>
            {post.likes || ''}
          </span>
        </span>
      );
    }
    var text = sanitizeHtml(post.text, {allowedTags: ['div', 'br']});

    var tags = post.tags.map(function(name, i){return <a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>})

    if (window.currentUser && window.currentUser.admin){
      var admin_block = (
        <CategorySelect
          recommended={post.recommended}
          visible={post.visible}
          moderated={post.moderated}
          url={post.url}
          values={post.categories}/>
      );
      var post_id = post.id;
    }
    if(post.linkdata.description)
      var title_link = <h3 className='title'>{post.linkdata.description}</h3>
    if(tags.length)
      var tags_rendered = <p className='tags-sp'>{tags}</p>
    if(text)
      var text_rendered = <p className='text' dangerouslySetInnerHTML={{__html: text}}></p>
    if (post.sitelink)
      var sitelink_rendered = (
        <a href={post.sitelink} target='_blank'>{getLocation(post.sitelink).hostname}</a>
      );
    return(
        <figure>
          <div className='wrap-figure-explore-post'>
            {image}

            <figcaption className='content-board border-b-radius'>
            <div className='main-contain'>
              {link_rendered}
              {title_link}
              <h4>{post.title}</h4>
            </div>
            {admin_block}
            <div className='price-explore-post'>
              <DiscountBlock price={post.price} discount_price={post.discount_price}/>
            </div>
            <footer className='border-b-radius'>
              <div className='delicious-like'>
                <div className='show-post'>
                  <div className="avatar-explore" style={{
                    background: 'url(' + post.author.avatar + ') no-repeat',
                    backgroundSize:'cover'}}>
                  </div>
                  <span>
                    <a href={post.author.url}>{post.author.name}</a>
                    <p>
                      {sitelink_rendered}
                    </p>
                  </span>
                </div>
                <div className='action-of-post'>
                  <div>
                    <span>
                      <img
                        title='Комментарий'
                        data-toggle="tooltip"
                        data-placement="top"
                        src='/images/comment3.png' />
                      <span>
                        {post.comments.length || ''}
                      </span>
                    </span>
                  </div>
                  <div>
                    {rendered_likes}
                  </div>
                </div>
              </div>
            </footer>
            <div className='clearboth'>
            </div>
            </figcaption>
          </div>
        </figure>
    );
  }
});
