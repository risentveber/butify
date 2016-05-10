import React from 'react';

export default class DiscountBlock extends React.Component {
  render(){
    if (this.props.discount_price){

      var discount_rendered = ''
      var preliminary_calculation = Math.round(this.props.discount_price / this.props.price * 100)
      if(preliminary_calculation < 100){
        var procents = 100 - preliminary_calculation;
        discount_rendered = <h6><span className='sale-value'>Скидка {procents}%</span></h6>
      }

      var price
      var discount_price_rendered = ''
      if(this.props.price > this.props.discount_price){
        var discount_price_rendered = <span className='sale-price'>{this.props.discount_price} ₽</span>
        price = <span className='old-price'>Цена: {this.props.price} ₽</span>
      }else{
        price = <span className='current-price'>Цена: {this.props.price} ₽</span>
      }
    }
    else{
      var price = <span className='current-price'>Цена: {this.props.price} ₽</span>
    }
    return (
      <div>
        <h6>
          {price}
          &nbsp;&nbsp;
          {discount_price_rendered}
        </h6>
        {discount_rendered}
      </div>
    );
  }
}