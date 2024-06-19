import React from 'react'
import { Link } from 'react-router-dom'
import KanBan from '../components/nav_and_footer/KanBan'

function NotFund() {
  return (
    <div>
        <KanBan/>
        <h1 className='notfound-h1'>Oops!您好像進入到錯的空間了Σ(ﾟдﾟ)</h1>
        <div className='notfound-link'>
          <Link to="/">點我回到首頁/ᐠ｡ꞈ｡ᐟ\</Link>
        </div>
    </div>
  )
}

export default NotFund