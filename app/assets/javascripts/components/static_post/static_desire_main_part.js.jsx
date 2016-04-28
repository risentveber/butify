var StaticDesireMainPart = React.createClass({
  render: function() {
    return (
      <div>
        <div className='post-title desire-title'>
          <input
              ref='title'
              type='text'
              value={this.props.desire.title}
              onChange={this.props.onChangeTitle}
              className='input-new-desire form-text-title input-sp form-control'
              placeholder = 'Напишите суть желания. Кому? Зачем? Куда?'
              autoFocus = 'true'/>
        </div>

        <div className='post-description desire-description'>
          <div className="usual-desire-text-create action-create-element-desire">
            <ContentEditable
              className='text-new-post text-new-desire'
              html={this.props.desire.text}
              onChange={this.props.onChangeText}
              placeholder="Если хотите, можете написать подробнее, указать детали, привести примеры и загрузить фото."
            />
          </div>
        </div>
        <div className="post-img desire-img">
          <PhotosBox
            addPhoto={this.props.addPhoto}
            removePhoto={this.props.removePhoto}
            photos={this.props.desire.photos}/>
        </div>
      </div>
    );
  }
});
