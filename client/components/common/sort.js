import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '../../redux/reducers/goods'
import { setSortCart } from '../../redux/reducers/basket'

const Sort = () => {
  const [toggled, setToggled] = useState(true)
  const [sortMethod, setSortMethod] = useState('')
  const [activeSort, setActiveSort] = useState('')
  const dispatch = useDispatch()
  const onClick = (sortType) => {
    return () => {
      setToggled(!toggled)
      setSortMethod(toggled ? '▲' : '▼')
      setActiveSort(sortType)
      dispatch(setSort(sortType, toggled))
      dispatch(setSortCart(sortType, toggled))
    }
  }
  return (
    <div>
      <div>sort by</div>
      <button
        id="sort-price"
        type="button"
        className="mt-2 px-3 mx-2 py-2 bg-blue-500 t rounded-lg text-white"
        onClick={onClick('price')}
      >
        price {activeSort === 'price' && sortMethod}
      </button>
      <button
        id="sort-name"
        type="button"
        className="mt-2 px-3 mx-2 py-2 bg-blue-500 t rounded-lg text-white"
        onClick={onClick('abc')}
      >
        alphabet {activeSort === 'abc' && sortMethod}
      </button>
    </div>
  )
}

export default Sort
