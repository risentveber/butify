import React from 'react'

export default class PublicationTimeBlock extends React.Component{
  componentDidMount() {
    $(this.refs.publicated_at).datetimepicker({
        autoclose: true,
        startDate: new Date(),
        format: 'yyyy-mm-dd hh:ii',
        language: 'ru'
      }).change(this.props.onChangePublicatedAt);
  }
  render() {
    return (
      <span>
        <input className='input-sp' placeholder='Укажите дату' ref='publicated_at'
          value={this.props.publication_date}/>
      </span>
    );
  }
}
