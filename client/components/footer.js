import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="w-full mt-12">
      <hr />
      <div className="flex justify-between shadow-inner bg-gray-200 p-6">
        <div className="flex flex-row">
          <div className="px-2">Vitaly K</div>
          <div className="px-2">2020</div>
        </div>
        <div>
          <Link to="/logs">Logs</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
