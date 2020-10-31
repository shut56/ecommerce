import axios from 'axios'

const GET_GOODS = 'GET_GOODS'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_SORT = 'SET_SORT'

const initialState = {
  listOfGoods: [],
  rates: {
    USD: 1
  },
  currency: 'USD',
  symbols: {
    USD: '$'
  },
  sortType: ''
}

const getImage = (products) => {
  return products.map((item) => ({
    ...item,
    image: `https://source.unsplash.com/featured/?${/\w+(?=\s)/gi.exec(item.title)}`
  }))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOODS: {
      return {
        ...state,
        listOfGoods: getImage(action.data)
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.data,
        rates: action.rates,
        symbols: action.symbols
      }
    }
    case SET_SORT: {
      const sortedList = [...state.listOfGoods].sort((a, b) => {
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
          listOfGoods: sortedList.reverse()
        }
      }
      return {
        ...state,
        listOfGoods: sortedList
      }
    }
    default:
      return state
  }
}

export function getGoods() {
  return (dispatch) => {
    axios('/api/v1/goods').then(({ data }) => {
      dispatch({ type: GET_GOODS, data })
    })
  }
}

export function setCurrency(currency) {
  return (dispatch, getState) => {
    const store = getState()
    const { currency: oldCurrency } = store.goods
    axios('/api/v1/rates').then(({ data }) => {
      dispatch({
        type: SET_CURRENCY,
        data: currency.toUpperCase(),
        rates: data.rates,
        symbols: data.symbols
      })
    })
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `change currency from ${oldCurrency} to ${currency}`
      }
    }).catch((err) => console.log(err))
  }
}

export function setSort(name, sortType) {
  return {
    type: SET_SORT,
    sortType,
    name
  }
}
