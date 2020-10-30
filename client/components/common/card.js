import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/basket'

const Card = (props) => {
  const { data } = props
  const currency = useSelector((s) => s.goods.currency)
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const actualPrice = data.price * rate
  const dispatch = useDispatch()
  const product = useSelector((s) => s.basket.cart).find((item) => item.id === data.id)
  return (
    <div className="flex flex-col card max-w-xs rounded overflow-hidden shadow-lg">
      <img className="card__image w-full object-cover h-40" src={data.image} alt={data.title} />
      <div className="px-6 py-4">
        <div className="card__title font-bold text-xl mb-2">{data.title}</div>
        <div className="flex justify-evenly">
          <div className="card__price text-gray-700 text-base">{actualPrice.toFixed(2)}</div>
          <div className="currency text-gray-700 text-base">{currency}</div>
        </div>
        <div className="card__product-amount text-gray-700 text-base">
          in cart: {typeof product === 'undefined' ? 0 : product.count}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          type="button"
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={() => dispatch(addToCart(data))}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default Card
