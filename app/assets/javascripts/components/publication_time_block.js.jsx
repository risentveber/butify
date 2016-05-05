const PublicationTimeBlock = React.createClass({
  componentDidMount: function() {
    $(this.refs.publicated_at).datetimepicker({
        autoclose: true,
        startDate: new Date(),
        format: 'yyyy-mm-dd hh:ii',
        language: 'ru'
      }).change(this.props.onChangePublicatedAt);
  },
  render: function() {
    return (
      <span>
        <input className='input-sp' placeholder='Укажите дату' ref='publicated_at'
          value={this.props.publication_date}/>
      </span>
    );
  }
});
