import React, {useEffect, useState} from 'react'
import { CardGroup, Container } from 'react-bootstrap'
import LoginCard from './LoginCard'
import useFetch from '../hooks/useFetch'

/***
 *使用者＋商家的登入group
 ***/
function LogIn() {

  return (
    <div className='login-div'>
      <Container fulid>
        <h1 className='home-login-title'>讓我們即刻開始吧！</h1>
        <CardGroup>
            {/* 使用者登入註冊 */}
            <LoginCard isConsumer={true}/>

            {/* 商家登入註冊 */}
            <LoginCard isConsumer={false}/>
        </CardGroup>
      </Container>
    </div>
  )
}

export default LogIn