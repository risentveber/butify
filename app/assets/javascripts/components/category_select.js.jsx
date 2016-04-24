var CategorySelect = React.createClass({
  componentDidMount() {
    $(this.refs.input).selectize({
      options: window.categories,
      items: this.props.values
    })
    console.log(this.props);
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  saveClick(){
    var data =  {
      visible: this.refs.visible.checked,
      moderated: this.refs.moderated.checked,
      recommended: this.refs.recommend.checked,
      category_ids: $(this.refs.input).val()
    }
    //cl
    console.log(data);
    //alert(this.refs.recommend.checked);
    $.ajax({
      url: this.props.url + '/change_categories',
      //dataType: 'json',
      data: {
        post: data
      },
      type: 'PUT',
      success: function(data) {}
    });
  },
  render: function(){
    // var selected = this.props.values || [];
    // var rendered_options = $.map(selected, function (e, index) {
    //   return (<option key={index} value={e.id}>{e.name}</option>);
    // });
    return (
      <div className = 'post-tags-create clearboth'>

        <label>Рекомендованное</label>
        <input ref='recommend' defaultChecked={this.props.recommended} type="checkbox"/>
        <label>Показывать в новом</label>
        <input ref='visible' defaultChecked={this.props.visible} type="checkbox"/>
        <label>Модерация</label>
        <input ref='moderated' defaultChecked={this.props.moderated} type="checkbox"/>
        <select
          ref='input'
          multiple
          placeholder='Категории'
          style={{width: '100%', visibility:'hidden'}} >
        </select>
        <button onClick={this.saveClick} className='btn btn-xs btn-st'>Сохранить</button>
        <div className = 'tags-sp'>
        </div>
      </div>
    );
  }
});
