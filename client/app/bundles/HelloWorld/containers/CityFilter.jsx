import React from 'react'
import queryString from 'query-string'

export default class CityFilter extends React.Component {
  constructor(props, context){
    super(props, context)
  }
  onClickMyCity(){
    let q = queryString.parse(location.search);
    q.city_id = window.currentUser.city_id;
    Turbolinks.visit(location.pathname + '?' + queryString.stringify(q));
  }
  onClickAllpublications(){
    let q = queryString.parse(location.search);
    q.city_id = undefined;
    Turbolinks.visit(location.pathname + '?' + queryString.stringify(q));
  }
  componentDidMount(){
    $(this.refs.city_select).selectize({
      options: window.cities,
      load: function(query, callback) {
        console.log('selectize', query, callback);
        if (query.length == 0 ) return callback();
        $.ajax({
          url: '/ajax/get_cities?term=' + encodeURIComponent(query),
          type: 'GET',
          error: function() {
            callback();
          },
          success: function(data) {
            var result = data.map(function(e){return {value: e.id, text: e.name}});
            console.log(result);
            callback(result);
          }
        });
      }
    }).on("change", function (e) {
      var q = queryString.parse(location.search);
      q.city_id = e.target.value;
      Turbolinks.visit(location.pathname + '?' + queryString.stringify(q));
    })
  }
  render(){
    //console.log('city filter', this.props)
    var allPublicationsButton, myCityButton;
    if (this.props.city) {
      allPublicationsButton =  (
        <button onClick={this.onClickAllpublications}
        className = 'btn btn-st-sm btn-explore'>
        Все публикации </button>
      );
    } else {
      allPublicationsButton = (
        <button onClick={this.onClickAllpublications}
          className = 'btn btn-st-sm btn-explore btn-explore-active'>
          Все публикации</button>
      );
    }

    let current_user = this.props.current_user;
    let city = this.props.city;

    if (current_user.id && current_user.city_id  ){
      if (city && current_user.city_id == city.id )
        myCityButton = <button onClick={this.onClickMyCity}
          className = 'btn btn-st-sm btn-explore btn-explore-active'>
          Мой город
        </button>
      else
        myCityButton = <button onClick={this.onClickMyCity}
          className = 'btn btn-st-sm btn-explore'>
          Мой город
        </button>
    }
    return (
      <div className='city-explore'>
        <p>
          {allPublicationsButton}
          {myCityButton}
        </p>
        <select ref='city_select' placeholder={city && city.name || 'или укажите город'}/>
      </div>
    )
  }
}