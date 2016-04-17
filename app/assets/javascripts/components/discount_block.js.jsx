const DiscountBlock = React.createClass({
  render(){
    if (this.props.discount_price){
      var procents = Math.round(this.props.discount_price / this.props.price * 100);
      var discount_price_rendered = <span className='sale-price'>{this.props.discount_price} ₽</span>
      var discount_rendered = <h5><span className='sale-value'>Скидка {procents}%</span></h5>
    }
    return (
      <div>
        <h4>Цена:
          <span className='old-price'>{this.props.price} ₽</span>
          {discount_price_rendered}
        </h4>
        {discount_rendered}
      </div>
    );
  }
})