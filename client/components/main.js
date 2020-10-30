import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Head from './head'
import Header from './header'
import Card from './common/card'

import { getGoods } from '../redux/reducers/goods'

const Main = () => {
  const listOfGoods = useSelector((store) => store.goods.listOfGoods.slice(0, 10))
  const dispatch = useDispatch()

  useEffect(() => {
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`
      }
    }).catch((err) => console.log(err))
    dispatch(getGoods())
    return () => {}
  }, [])
  return (
    <div>
      <Head title="Hello" />
      <Header />
      <div className="flex flex-wrap">
        {listOfGoods.map((item) => {
          return (
            <div key={item.id} className="m-2">
              <Card data={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Main
