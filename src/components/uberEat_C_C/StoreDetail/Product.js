import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Container, Row, Col, Image } from 'react-bootstrap'
import Axios from 'components/Axios'


/*** 
 * 餐點彈出視窗
 ***/
function Meal(props) {
    const serverUrl = props.baseUrl

    const [info, setInfo] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    // 若按下購物車按鈕，進行的動作！
    const addCartHandler = (gid) =>{
        let data = {
            goods_id: gid,
            quantity: 1,
        }
        Axios().post('order/cart/', JSON.stringify(data))
        .then((res)=>{
            if (res.status === 201) {
                setShowAlert(true); // 顯示警告框
                setTimeout(() => {
                  setShowAlert(false); // 1 秒後隱藏警告框
                  props.onHide(); // 關閉 Modal
                }, 1000);
              }
        })
        .catch((err)=>{
            if(err.response.status === 404){
              alert("此商品已下架摟，請重新選擇！")
              window.location.reload()
            }
            else if (err.response.status === 400){
              alert("商品已全數售出！請選擇其他商品")
            }
        })
    }
  
    useEffect(()=>{
        setInfo(props.goodinfo)
    },[props])
    

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {info && (
            <Form>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {info.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>
                      <p>類型：{info.type}</p>
                      <p>成分：{info.ingredient}</p>
                      <p>{info.intro}</p>
                    </Col>
                    <Col>
                      <Image
                        src={`${info.baseUrl}${info.food_pic}`}
                        alt={info.food_pic}
                        style={{width:"100%",paddingBottom:"5%"}}

                      />
                    </Col>
                  </Row>
                  <Row xs={2} md={4} lg={6}>
                    <Col md={6}>
                      <p>價格：$ {info.price}</p>
                    </Col>
                    <Col md={6}>
                      <p style={{ color: '#B11B1B' }}>
                        剩餘數量：{info.quantity}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                {/* 顯示警告框 */}
                {showAlert ? (
                  <div className="alert alert-success" role="alert">
                    已成功加入購物車
                  </div>
                ) : (
                  <Button type="button" onClick={() => addCartHandler(info.id)}>
                    加到購物車
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          )}
        </Modal>
      );
}

export default Meal