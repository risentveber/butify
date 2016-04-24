var StaticPostMainPart = React.createClass({
  componentDidMount() {
    var self = this;
    $(this.refs.input).selectize({
      options: window.categories,
      items: this.props.post.category_ids,
      maxItems: 2,
      placeholder: 'Категории (не более 2-ух)'
    }).change(function () {
      self.props.changeCategoryIds($(self.refs.input).val())
    })

  },
  render: function() {
    //console.log(this.props);
    if (this.props.discountIsShown){
      var discountPriceRendered = (
        <h4>Цена со скидкой:&nbsp;
          <span className='sale-price'>
            <input
              value={this.props.post.discount_price}
              min='0'
              onChange={this.props.onChangeDiscountPrice}
              type='number'
              className='input-modal-price' />&nbsp;
          ₽</span>
        </h4>
      );
    }
    return (
      <div className="modal-body">
        <div className='modal-post-content'>
          <div className="form-edit-post usual-post-contant border-t-radius">
            <PhotosBox
              addPhoto={this.props.addPhoto}
              removePhoto={this.props.removePhoto}
              photos={this.props.post.photos}/>
          </div>
          <div className='title-post-create'>
            <input
              ref='title'
              type='text'
              value={this.props.post.title}
              onChange={this.props.onChangeTitle}
              className='input-new-post form-text-title input-sp form-control'
              placeholder = 'Название товара'/>
          </div>
          <div className="padding-usual-post-text-create">
            <div className="usual-post-text-create action-create-element-post">
              <ContentEditable
                className='text-new-post'
                html={this.props.post.text}
                onChange={this.props.onChangeText}
                placeholder="Если хотите, можете добавить описание"
              />
            </div>
          </div>
        </div>
        <div className='modal-atributes'>
          <div className='modal-site'>
            <input
              value={this.props.post.sitelink}
              onChange={this.props.onChangeSitelink}
              className="text-new-post create-site-link"
              placeholder='Ссылка на сайт'
              type='text' />
          </div>
          <div className='modal-price'>
            <h4>
              Цена:&nbsp;
              <input
                type='number'
                min='0'
                value={this.props.post.price}
                onChange={this.props.onChangePrice}
                className='input-modal-price' />&nbsp;
              ₽
              </h4>
            <a onClick={this.props.showDiscount}>Добавить скидку</a>
            {discountPriceRendered}
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
