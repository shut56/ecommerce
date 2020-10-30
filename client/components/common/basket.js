import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../header'
import { updateAmount } from '../../redux/reducers/basket'

const Basket = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.basket.cart)
  const { totalPrice, count } = useSelector((store) => store.basket)
  const currency = useSelector((s) => s.goods.currency)
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const actualPrice = totalPrice * rate
  return (
    <div>
      <Header />
      <div>Dis is basket</div>
      <div className="flex justify-center">
        <div className="flex flex-col border">
          <div className="font-bold flex flex-row justify-around border">
            <div className="w-1/10 mx-4">#</div>
            <div className="w-1/10 mx-4">Image</div>
            <div className="w-5/10 mx-4">Title</div>
            <div className="w-1/10 mx-4">Price</div>
            <div className="w-1/10 mx-4">Amount</div>
            <div className="w-1/10 mx-4">Total</div>
          </div>
          {Object.keys(cartItems).map((item, index) => {
            // if (typeof cartItems[item] !== 'undefined' && cartItems[item].count !== 0) {
            return (
              <div className="flex flex-row border" key={item}>
                <div className="w-1/10 mx-4 px-4">{index + 1}</div>
                <img
                  className="product__image object-cover h-12 w-1/10 mx-4 px-4"
                  src={cartItems[item].image}
                  alt={cartItems[item].title}
                />
                <div className="product__title w-1/10 mx-4 px-4">{cartItems[item].title}</div>
                <div className="product__price w-1/10 mx-4 px-4">
                  {(cartItems[item].price * rate).toFixed(2)} {currency}
                </div>
                <div className="product__amount flex flex-row w-1/10 mx-4 px-4">
                  <button
                    className="m-2 product__remove"
                    type="button"
                    onClick={() => dispatch(updateAmount(cartItems[item].id, '-'))}
                  >
                    -
                  </button>
                  <div className="m-2">
                    {typeof cartItems[item] === 'undefined' ? 0 : cartItems[item].count}
                  </div>
                  <button
                    className="m-2"
                    type="button"
                    onClick={() => dispatch(updateAmount(cartItems[item].id, '+'))}
                  >
                    +
                  </button>
                </div>
                <div className="product__total_price">
                  {(cartItems[item].price * cartItems[item].count * rate).toFixed(2)} {currency}
                </div>
              </div>
            )
            // }
            // return <div key={index}>Cart is empty</div>
          })}
        </div>
      </div>
      <div id="total-amount">Total amount: {count}</div>
      <div id="total-price">
        Total price: {actualPrice.toFixed(2)} {currency}
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default Basket