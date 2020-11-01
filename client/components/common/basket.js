import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Head from '../head'
import Header from '../header'
import Footer from '../footer'
import { updateAmount } from '../../redux/reducers/basket'

const Basket = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.basket.cart)
  const { totalPrice, totalAmount } = useSelector((store) => store.basket)
  const currency = useSelector((s) => s.goods.currency)
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const actualPrice = totalPrice * rate

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`
      }
    }).catch((err) => console.log(err))
    return () => {}
  }, [])
  return (
    <div>
      <Head title="Cart" />
      <Header />
      <div className="flex w-11/12">
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-6 items-center bg-gray-200 border">
            <div>#</div>
            <div>Image</div>
            <div>Title</div>
            <div>Price</div>
            <div>Amount</div>
            <div>Total</div>
          </div>
          {cartItems.map((item, index) => {
            return (
              <div className="grid grid-cols-6 items-center border" key={item.id}>
                <div className="w-6 mx-4 px-4">{index + 1}</div>
                <img
                  className="product__image object-cover h-12 w-1/10 mx-4 px-4"
                  src={item.image}
                  alt={item.title}
                />
                <div className="product__title w-1/10 mx-4 px-4">{item.title}</div>
                <div className="product__price w-1/10 mx-4 px-4">
                  {(item.price * rate).toFixed(2)} {currency}
                </div>
                <div className="product__amount flex flex-row justify-between font-bold w-1/10 m-2 border rounded-lg border-gray-300">
                  <button
                    className="product__remove px-2 border-r bg-gray-200 border-gray-300"
                    type="button"
                    onClick={() => dispatch(updateAmount(item, '-'))}
                  >
                    -
                  </button>
                  <div className="w-8 text-center">{typeof item === 'undefined' ? 0 : item.count}</div>
                  <button
                    className="product__add px-2 border-l bg-gray-200 border-gray-300"
                    type="button"
                    onClick={() => dispatch(updateAmount(item, '+'))}
                  >
                    +
                  </button>
                </div>
                <div className="product__total_price">
                  {(item.price * item.count * rate).toFixed(2)} {currency}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div id="total-amount">Total amount: {totalAmount}</div>
      <div id="total-price">
        Total price: {actualPrice.toFixed(2)} {currency}
      </div>
      <Footer />
    </div>
  )
}

Basket.propTypes = {}

export default Basket
