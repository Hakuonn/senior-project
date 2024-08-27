import React from 'react'
import { CardGroup, Container } from 'react-bootstrap'
import LoginCard from './LoginCard'

/***
 *使用者＋商家的登入group
 ***/
function LogIn() {

  return (
    <Container className='login-div mb-4' style={{marginTop: '5vh'}}>
        <h1 className='home-login-title' style={{textAlign:'center'}}>讓我們即刻開始吧！</h1>
        <CardGroup>
            {/* 使用者登入註冊 */}
            <LoginCard isConsumer={true}/>

            {/* 商家登入註冊 */}
            <LoginCard isConsumer={false}/>
        </CardGroup>
    </Container>
  )
}

export default LogIn