import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'

import Currency from './common/currency'
import Sort from './common/sort'
import OrderCount from './common/order-count'

import { saveCart } from '../redux/reducers/basket'

const Header = () => {
  const basket = useSelector((s) => s.basket)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(saveCart(localStorage.getItem('cart')))
    return () => {}
  }, [])
  return (
    <div className="w-full">
      {
        useBeforeunload(() => localStorage.setItem('cart', JSON.stringify(basket)))
      }
      <div className="flex bg-indigo-800 justify-center items-center p-2 text-white font-bold">
        <div>
          <img src="images/pepe-smile.png" width="80" alt="frog" />
        </div>
        <div className="text-3xl ml-4" id="brand-name">
          <Link to="/">Pepe&apos;s Shop</Link>
        </div>
      </div>
      <Currency />
      <Sort />
      <OrderCount />
    </div>
  )
}

export default Header
