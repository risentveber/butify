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
    var images_count = $.grep(post.text_elements, function(e){return e.type == ElementTypes.image});
    images_count = images_count.length;
    var all_images_count;
    if (images_count + photo_count > 1)
      all_images_count = <span className="explore-num-photo">{images_count + photo_count}</span>
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
          url={post.url}
          values={post.categories}/>
      );
      var post_id = this.props.post.id;
    }
    if(post.linkdata.description)
      var title_link = <h3 className='title'>{post.linkdata.description}</h3>
    if(tags.length)
      var tags_rendered = <p className='tags-sp'>{tags}</p>
    if(text)
      var text_rendered = <p className='text' dangerouslySetInnerHTML={{__html: text}}></p>

    var price_block = (
      <div className='price-explore-post'>
        <h5>Цена: <span className='old-price'>1190 ₽</span> <span className='sale-price'>990 ₽</span></h5>
        <h5><span className='sale-value'>Скидка 50%</span></h5>
      </div>
    );
    return(
        <figure>
          <div className='wrap-figure-explore-post'>
            {image}

            <figcaption className='content-board border-b-radius'>
            <div className='main-contain'>
              {link_rendered}
              {title_link}
              {/*text_rendered*/}
              {/*tags_rendered*/}
              <div>

              </div>
            </div>
            {admin_block}
            {price_block}
            <footer className='border-b-radius'>
              <div className='delicious-like'>
                <div className='show-post'>
                  <img className='avatar-explore' src={post.author.avatar}/>
                  <span>
                    <a href={post.author.url}>{post.author.name}</a>
                    <p>
                      <a>{post.sitelink}</a>
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
