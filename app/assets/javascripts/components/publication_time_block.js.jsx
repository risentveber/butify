const PublicationTimeBlock = React.createClass({
  componentDidMount: function() {
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    $(this.refs.publicated_at).datetimepicker({
        autoclose: true,
        todayBtn: true,
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
