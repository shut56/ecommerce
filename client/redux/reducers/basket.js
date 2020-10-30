const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'
const SET_SORT = 'SET_SORT'

const initialState = {
  cart: [],
  totalPrice: 0,
  totalAmount: 0
}

const setCount = (product) => {
  if (typeof product !== 'undefined') {
    const count = product.count + 1
    return count
  }
  return 1
}

const sumOfItems = (cart) => {
  if (typeof cart !== 'undefined') {
    return cart.reduce((acc, rec) => acc + rec.count, 0)
  }
  return 0
}

const globalCountPrice = (cart) => {
  const totalAmount = cart.reduce((acc, rec) => acc + rec.count, 0)
  const totalPrice = cart.reduce((acc, rec) => acc + rec.price * rec.count, 0)
  return { totalAmount, totalPrice }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.item,
            count: setCount(state.cart.find((item) => item.id === action.item.id))
          }
        ],
        totalPrice: state.totalPrice + action.item.price,
        count: sumOfItems(state.cart) + 1
      }
    }
    case UPDATE_AMOUNT: {
      const product = state.cart.find((item) => item.id === action.item.id)
      const newAmount = product.count + action.payload
      const updatedCart = state.cart.reduce((acc, rec) => {
        if (rec.id !== action.item.id) {
          return [...acc, rec]
        }
        return [...acc]
      }, [])
      if (newAmount <= 0) {
        return {
          ...state,
          cart: [...updatedCart],
          ...globalCountPrice(updatedCart)
        }
      }
      const updatedState = {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.item,
            count: newAmount
          }
        ]
      }
      return {
        ...updatedState,
        ...globalCountPrice(updatedState.cart)
      }
    }
    case SET_SORT: {
      const sortedList = [...state.cart].sort((a, b) => {
        if (action.name !== 'abc') {
          if (a.price < b.price) {
            return -1
          }
          if (a.price > b.price) {
            return 1
          }
        }
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        return 0
      })
      if (action.sortType === false) {
        return {
          ...state,
          cart: sortedList.reverse()
        }
      }
      return {
        ...state,
        cart: sortedList
      }
    }
    default:
      return state
  }
}

export function addToCart(item) {
  return { type: ADD_TO_CART, item }
}

export function updateAmount(item, change) {
  let payload = 0
  if (change === '+') {
    payload = 1
  }
  if (change === '-') {
    payload = -1
  }
  return {
    type: UPDATE_AMOUNT,
    item,
    payload
  }
}

export function setSortCart(name, sortType) {
  return {
    type: SET_SORT,
    sortType,
    name
  }
}
