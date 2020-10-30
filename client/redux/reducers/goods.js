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
  sortType: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOODS: {
      return {
        ...state,
        listOfGoods: action.data
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.data,
        rates: action.rates
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
  return (dispatch) => {
    axios('https://api.exchangeratesapi.io/latest?base=USD').then(({ data }) => {
      dispatch({
        type: SET_CURRENCY,
        data: currency.toUpperCase(),
        rates: data.rates
      })
    })
  }
}

export function setSort(name, sortType) {
  return {
    type: SET_SORT,
    sortType,
    name
  }
}
