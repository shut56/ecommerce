import React from 'react'
import { Link } from 'react-router-dom'

import Currency from './common/currency'
import Sort from './common/sort'
import OrderCount from './common/order-count'

const Header = () => {
  return (
    <div>
      <div className="flex bg-indigo-800 justify-center p-2 text-white font-bold">
        <div id="brand-name">
          <Link to="/"> Лягушкин рынок </Link>
        </div>
      </div>
      <Currency />
      <Sort />
      <OrderCount />
    </div>
  )
}

export default Header
