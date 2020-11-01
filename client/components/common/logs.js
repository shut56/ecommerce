import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Head from '../head'
import Footer from '../footer'
import { getLogs } from '../../redux/reducers/logs'

const Logs = () => {
  const dispatch = useDispatch()
  const logs = useSelector((store) => store.logs.listOfLogs)
  useEffect(() => {
    dispatch(getLogs())
    axios({
      method: 'post',
      url: '/api/v1/logs',
      data: {
        time: +new Date(),
        action: `navigate to ${window.location.pathname} page`
      }
    }).catch((err) => console.log(err))
    return () => {}
  }, [])
  return (
    <div className="flex flex-col">
      <Head title="Logs" />
      <div className="flex bg-indigo-800 justify-around p-2 text-white font-bold">
        <div>Logs</div>
        <div className="flex">
          <div className="px-2">Numbers of records:</div>
          <div className="px-2">{logs.length}</div>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <div className="flex flex-col border-2 border-gray-400 rounded-lg max-w-screen-lg shadow-md">
          {logs.map((logString, index, array) => {
            const topLog = index === 0 ? ' rounded-t-lg' : ''
            const botLog = index === array.length - 1 ? ' rounded-b-lg' : ''
            return (
              <div key={logString.time} >
                <div className={`bg-gray-200 py-2 px-4${topLog}`}>{Date(logString.time)}</div>
                <div className={`bg-gray-100 py-2 px-4${botLog}`}>{logString.action}</div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Logs
