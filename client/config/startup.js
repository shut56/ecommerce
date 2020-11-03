import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { getOldCart } from '../redux/reducers/basket'

const Startup = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('Startup render')
    dispatch(getOldCart(localStorage.getItem('cart')))
  }, [])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
