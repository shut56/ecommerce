import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrency } from '../../redux/reducers/goods'

const Currency = () => {
  const dispatch = useDispatch()
  const currencyClick = (currency) => {
    return dispatch(setCurrency(currency))
  }
  return (
    <div>
      <button
        type="button"
        id="usd-button"
        className="mt-2 px-3 mx-2 py-2 bg-blue-500 t rounded-lg text-white"
        onClick={() => currencyClick('USD')}
      >
        USD
      </button>
      <button
        type="button"
        id="eur-button"
        className="mt-2 px-3 mx-2 py-2 bg-blue-500 t rounded-lg text-white"
        onClick={() => currencyClick('EUR')}
      >
        EUR
      </button>
      <button
        type="button"
        id="cad-button"
        className="mt-2 px-3 mx-2 py-2 bg-blue-500 t rounded-lg text-white"
        onClick={() => currencyClick('CAD')}
      >
        CAD
      </button>
    </div>
  )
}

export default Currency
