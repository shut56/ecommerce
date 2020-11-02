import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'
const SET_SORT = 'SET_SORT'
const SAVE_CART = 'SAVE_CART'
const CLEAR_CART = 'CLEAR_CART'

const initialState = {
  cart: [],
  totalPrice: 0,
  totalAmount: 0
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

const setCount = (product, amount) => {
  if (typeof product !== 'undefined') {
    const count = product.count + amount
    return count
  }
  return 1
}

const updateCart = (cart, item, payload = 1) => {
  const itemInCart = cart.find((cartItem) => cartItem.id === item.id)
  const newItem = {
    ...(typeof itemInCart !== 'undefined' ? itemInCart : item),
    count: setCount(itemInCart, payload)
  }
  const upCart = typeof itemInCart !== 'undefined' ? [...cart] : [...cart, newItem]
  const newCart = upCart.map((cartItem) => (cartItem.id === item.id ? newItem : cartItem))
  return newCart.filter((cartItem) => cartItem.count !== 0)
}

const getOldCart = (cart) => {
  let oldCart
  try {
    oldCart = JSON.parse(cart)
  } catch (error) {
    oldCart = {}
  }
  return oldCart
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: updateCart(state.cart, action.item),
        totalPrice: state.totalPrice + action.item.price,
        totalAmount: sumOfItems(state.cart) + 1
      }
    }
    case UPDATE_AMOUNT: {
      const newCart = updateCart(state.cart, action.item, action.payload)
      const updatedState = {
        ...state,
        cart: [...newCart]
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
    case SAVE_CART: {
      return {
        ...state,
        ...getOldCart(action.cart)
      }
    }
    case CLEAR_CART: {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}

export function addToCart(item) {
  axios({
    method: 'post',
    url: '/api/v1/logs',
    data: {
      time: +new Date(),
      action: `add ${item.title} to the backet`
    }
  })
  return { type: ADD_TO_CART, item }
}

export function updateAmount(item, change) {
  let payload = 1
  if (change === '-') {
    payload = -1
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `remove ${item.title} from the backet`
      }
    })
  }
  return {
    type: UPDATE_AMOUNT,
    item,
    payload
  }
}

export function setSortCart(name, sortType) {
  axios({
    method: 'post',
    url: '/api/v1/logs',
    data: {
      time: +new Date(),
      action: `sort by ${name}`
    }
  })
  return {
    type: SET_SORT,
    sortType,
    name
  }
}

export function saveCart(cart) {
  return {
    type: SAVE_CART,
    cart
  }
}

export function clearCart() {
  return {
    type: CLEAR_CART
  }
}
