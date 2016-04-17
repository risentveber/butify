var ShowExplorePost = React.createClass({
  removeComment(comment_id){
    this.props.removeComment(this.props.post.id, comment_id);
  },
  likeClick(){
    this.props.likePost(this.props.post.id);
  },
  createComment(text){
    this.props.createComment(this.props.post.id, text);
  },
  updateComment(comment_id, text){
    this.props.updateComment(this.props.post.id, comment_id, text);
  },
  removeClick(){
    $.ajax({
      url: this.props.post.url,
      type: 'DELETE',
      success: function () {
        window.location = window.location;
      }
    });
    CI('PostBox::removePost', id);
  },
  render(){
    if (!this.props.post) return null;
    console.log(this.props.post)
    var post = this.props.post;
    var author = post.author;
    var rendered_categories = this.props.post.category_names.map(function(name, i){
      return (<h5 key={i}><a key={i} href={'/explore?category_name=' + name}>{name}</a></h5>);
    });
    var tags = this.props.post.tags.map(function(name, i){
      return <a key={i} href={'/explore?tag_name=' + name}>{'#'+name}</a>
    });
    if (tags.length > 0)
      var tags_block = (
        <div className='modal-tags'>
          <h5>Теги</h5>
          <p className="tags-sp">
            {tags}
          </p>
        </div>
      );
    var classname, classname_img;
    var like_image_path;
    if (this.props.post.current_like){
      like_image_path = '/images/like_active.png';
      classname = 'post-like post-like-active';
      if (this.props.post.current_like_just)
        classname_img += ' post-like-active-animate';
    } else {
      like_image_path = '/images/like_grey.png';
      classname = 'post-like';
    }
    //main_content =
    return (
      <ReactBootstrap.Modal
        dialogClassName='modal-dialog modal-dialog-show-post'
        show={Boolean(this.props.post)}
        onHide={this.props.onHide}>
          <div className="modal-header">
            <div className='post-autor'>
              <a href={author.url}>
                <div className="usual-avatar" style={{
                  background: 'url(' + author.avatar + ') no-repeat',
                  backgroundSize:'cover'}}>
                </div>
                <div className='post-autor-info'>
                  <h4 className="modal-title" id="myModalLabel">{author.name}</h4>
                  <div>{post.city_name}, {post.time}</div>
                </div>
              </a>
              <div className="action-angle post-action">
                <div className="btn-group">
                  <span className="sign-dots-menu" data-toggle="dropdown">•••</span>
                  <ul className="dropdown-menu blue-background-dropdown-menu" role="menu">
                    <li>
                      <a href={this.props.post.edit_url}>Редактировать</a>
                    </li>
                    <li>
                      <a onClick={this.removeClick}>Удалить</a>
                    </li>
                    <li>
                      <a>Пожаловаться</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className='modal-post-content'>
              <PostContentView
                post={post}/>
              <PostTextView
                text_elements={post.text_elements}/>

              <PostCommentBox
                hide_like={true}
                likeClick={this.likeClick}
                basketClick={this.basketClick}
                createComment={this.createComment}
                removeComment={this.removeComment}
                updateComment={this.updateComment}
                comments={this.props.post.comments}
                likes={this.props.post.likes}
                baskets_count={post.baskets_count}
                current_like_just={post.current_like_just||false}
                current_basket={post.current_basket}
                current_like={post.current_like}
              />
            </div>
            <div className='modal-atributes'>
              <div className='likes-and-views likes-and-price'>
                <ul>
                  <li className='likes' onClick={this.likeClick}>
                    <img src={like_image_path} className={classname_img}/> <span className='num-likes'>{post.likes || ''}</span>
                    <span className='show-post-site-link'><a>example.com</a></span>
                  </li>
                  <li>
                    <h4>Цена: <span className='old-price'>1190 ₽</span> <span className='sale-price'>990 ₽</span></h4>
                    <h5><span className='sale-value'>Скидка 50%</span></h5>
                  </li>
                  {/*<li className='views'>
                                      <img src='/images/views.png' /> <span>74563</span>
                                    </li>*/}
                </ul>
              </div>
              <div className='clearboth'>
              </div>
              <div className='modal-categories'>
                {rendered_categories}
              </div>
              {tags_block}
            </div>
          </div>
          <div className="modal-footer">
          </div>
      </ReactBootstrap.Modal>
    );
  }
})
