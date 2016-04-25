const PublicationTimeBlock = React.createClass({
  componentDidMount: function() {
    $(this.refs.publicated_at).datetimepicker({
        autoclose: true,
        todayBtn: true,
        startDate: new Date(),
        format: 'yyyy-mm-dd hh:ii',
        language:'ru'}).change(this.props.onChangePublicatedAt);
    //$(this.refs.publication_date).datepicker({autoclose: true, language: 'ru', startDate: Date(), endDate: endDate});
  },
  render: function() {
    return (
      <span>
        <input ref='publicated_at'
          value={this.props.publication_date}/>
      </span>
    );
  }
});
