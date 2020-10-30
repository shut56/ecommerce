import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

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
      <div className="flex bg-indigo-800 justify-around p-2 text-white font-bold">
        <div>Logs</div>
        <div className="flex">
          <div className="px-2">Numbers of records:</div>
          <div className="px-2">{logs.length}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col border-2 border-gray-400 rounded-lg max-w-screen-lg">
          {logs.map((logString) => {
            return (
              <div key={logString.time} className="py-2">
                <div className="bg-gray-200 px-4">{Date(logString.time)}</div>
                <div className="bg-gray-100 px-4">{logString.action}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Logs
