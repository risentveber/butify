var StaticPostMainPart = React.createClass({
  componentDidMount() {
    var self = this;
    $(this.refs.input).selectize({
      options: window.categories,
      items: this.props.post.category_ids,
      placeholder: 'Категории'
    }).change(function () {
      self.props.changeCategoryIds($(self.refs.input).val())
    })
  },
  render: function() {
    return (
      <div className="modal-body">
        <div className='modal-post-content'>
          <div className="form-edit-post usual-post-contant border-t-radius">
            <PhotosBox
              addPhoto={this.props.addPhoto}
              removePhoto={this.props.removePhoto}
              photos={this.props.post.photos}/>
          </div>
          <div className="padding-usual-post-text-create">
            <div className="usual-post-text-create action-create-element-post">
              <ContentEditableDiv
                onChange={this.props.onChangeText}
                placeholder="Если хотите, можете добавить описание"
                cssClass="text-new-post"
                html={this.props.post.text}/>
            </div>
          </div>
        </div>
        <div className='modal-atributes'>
          <div className='modal-site'>
            <input
            value={this.props.sitelink}
            onChange={this.props.onChangeSitelink}
            className="text-new-post create-site-link"
            placeholder='Ссылка на сайт'
            type='text' />
          </div>
          <div className='modal-price'>
            <h4>Цена: <input type='text' className='input-modal-price' /> ₽</h4>
            <a>Добавить скидку</a>
            <h4>Цена со скидкой: <span className='sale-price'><input type='text' className='input-modal-price' /> ₽</span></h4>
          </div>
          <div className='modal-category'>
            <select
              ref='input'
              multiple
              style={{width: '100%', visibility:'hidden'}} />
          </div>
          <div className='modal-tags'>
            <h5>Теги</h5>
            <TagSelect
              values={this.props.post.tags}
              setTags={this.props.setTags}/>
          </div>
        </div>
      </div>
    );
  }
});
