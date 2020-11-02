import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/basket'

const Card = (props) => {
  const { data } = props
  const currency = useSelector((s) => s.goods.symbols[s.goods.currency])
  const rate = useSelector((s) => s.goods.rates[s.goods.currency])
  const actualPrice = data.price * rate
  const dispatch = useDispatch()
  const product = useSelector((s) => s.basket.cart).find((item) => item.id === data.id)
  return (
    <div className="card flex flex-col rounded overflow-hidden shadow-lg">
      <img className="card__image object-cover h-40" src={data.image} alt={data.title} />
      <div className="p-2">
        <div className="card__title text-center font-bold text-xl break-words">{data.title}</div>
        <div className="flex justify-center items-center">
          <div className="card__price text-gray-700 text-xl">{actualPrice.toFixed(2)}</div>
          <div className="currency text-gray-700 text-xl">{currency}</div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-4">
        <button
          type="button"
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={() => dispatch(addToCart(data))}
        >
          Add to cart +
        </button>
        <div className="card__product-amount text-gray-700 text-base w-16">
          {typeof product === 'undefined' ? '' : `${product.count} in cart`}
        </div>
      </div>
    </div>
  )
}

export default Card
