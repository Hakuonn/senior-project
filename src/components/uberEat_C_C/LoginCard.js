import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import userLog from '../../imgs/userlog.png'
import storeLog from '../../imgs/storelog.png'
import Axios from '../Axios'

/***
 *登入Card
 ***/
function LoginCard({isConsumer}) {

    const CustomerClickHandler = (e) =>{
        // const w=window.open('_self')
        // w.location.href="/LoginPage"
        const w=window.open("/LoginPage",'_self')
    }
    const StoreclickHandler = (e)=>{
        // const w=window.open('_self');
        // w.location.href="/StoreLoginPage"
        const w=window.open("/StoreRegister",'_self')
    }

    // 切換使用者與商家
    const consumer = () =>{
      return(
        <>
          <Card.Img variant="top" src={userLog} />
          <Card.Body>
            <Card.Title className='login-card-title'>使用者登入/註冊</Card.Title>
            <div className="d-grid gap-2">
              <Button variant="success" size="lg" onClick={CustomerClickHandler}>使用者按我！</Button>
            </div>
          </Card.Body>
        </>
      )
    }

    // 使用者切換商家身份
    const changeStoreHandler = () => {
      Axios().get('store/info/check/')
          .then((res) => {
              if (res.status === 200) {
                  window.open("/StoreProduct", '_self');
              }
          })
          .catch((err) => {
              console.log(err);
              if (err.response && err.response.status === 403) {
                  alert('你沒有權限訪問這個資源，請確認你是否已登入並擁有必要的權限');
              } else {
                  alert('尚未登入/註冊ㄛ～');
              }
              window.location.reload();
          });
  }
  

    const store = () =>{
      return(
        <>
          <Card.Img variant="top" src={storeLog} />
          <Card.Body>
            <Card.Title className='login-card-title'>商家登入/註冊</Card.Title>
              <Row>
                <Col>
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={changeStoreHandler}>切換身份</Button>
                  </div>
                </Col>
                <Col>
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={StoreclickHandler}>商家註冊</Button>
                  </div>
                </Col>
              </Row>
          </Card.Body>
        </>
      )
    }


  return (
    <Card>
        {isConsumer ? consumer() : store()}
    </Card>
  )
}

export default LoginCard