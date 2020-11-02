import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Head from '../head'
import Header from '../header'
import Footer from '../footer'
import { updateAmount, clearCart } from '../../redux/reducers/basket'

const Basket = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.basket.cart)
  const { totalPrice, totalAmount } = useSelector((store) => store.basket)
  const { currency, symbols } = useSelector((s) => s.goods)
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
    })
    return () => {}
  }, [])
  return (
    <div>
      <Head title="Cart" />
      <Header />
      {totalAmount < 1 ? (
        <div className="my-4 text-center text-2xl font-bold text-gray-400">Cart is Empty</div>
      ) : (
        <div>
          <table className="table-fixed mx-auto my-4 w-4/5">
            <thead className="bg-gray-200 border">
              <tr>
                <th className="w-10 px-2 py-2">#</th>
                <th className="w-20 px-2 py-2">Image</th>
                <th className="w-auto px-4 py-2">Title</th>
                <th className="w-32 px-4 py-2">Price</th>
                <th className="w-24 p-2">Amount</th>
                <th className="w-32 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                return (
                  <tr className="border" key={item.id}>
                    <td className="w-10 text-center p-2">{index + 1}</td>
                    <td className="w-20 m-auto p-2 product__image">
                      <img className="object-cover" src={item.image} alt={item.title} />
                    </td>
                    <td className="w-auto m-auto px-4 py-2 product__title">{item.title}</td>
                    <td className="w-32 m-auto text-center py-2 product__price">
                      {(item.price * rate).toFixed(2)}
                      {symbols[currency]}
                    </td>
                    <td className="w-24 mx-auto my-2 product__amount flex flex-row justify-between font-bold h-8 border rounded-lg border-gray-300">
                      <button
                        className="product__remove px-2 border-r bg-gray-200 border-gray-300"
                        type="button"
                        onClick={() => dispatch(updateAmount(item, '-'))}
                      >
                        -
                      </button>
                      <div className="w-8 text-center">
                        {typeof item === 'undefined' ? 0 : item.count}
                      </div>
                      <button
                        className="product__add px-2 border-l bg-gray-200 border-gray-300"
                        type="button"
                        onClick={() => dispatch(updateAmount(item, '+'))}
                      >
                        +
                      </button>
                    </td>
                    <td className="w-32 m-auto text-center py-2 product__total_price">
                      {(item.price * item.count * rate).toFixed(2)}
                      {symbols[currency]}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex flex-col items-center">
            <button type="button" className="py-2 w-40 rounded-full bg-gray-200" onClick={() => dispatch(clearCart())}>Clear</button>
            <div className="font-bold">Total</div>
            <div id="total-amount">Total amount: {totalAmount}</div>
            <div id="total-price">
              Total price: {actualPrice.toFixed(2)} {currency}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

Basket.propTypes = {}

export default Basket
