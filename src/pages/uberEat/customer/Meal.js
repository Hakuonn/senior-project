import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Container, Row, Col, Image } from 'react-bootstrap'
import Axios from '../../components/Axios'
import { Link, useNavigate } from 'react-router-dom'
import { Divider, Space, Tag } from 'antd';
import useFetch from '../../hooks/useFetch';


/*** 
 * 餐點彈出視窗
 ***/
function Meal(props) {
    const [serverUrl, setServerUrl] = useState(null)
    const { data: serverURL } = useFetch("http://localhost:8002/serverURL")
    const [info, setInfo] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    
    const navigate = useNavigate()

    const addCartHandler = (gid) =>{
        let data = {
            gid: gid,
            quantity: 1,
        }
        Axios().post('/cart/add/', JSON.stringify(data))
        .then((res)=>{
            if (res.status === 200) {
                setShowAlert(true); // 顯示警告框
                setTimeout(() => {
                  setShowAlert(false); // 1 秒後隱藏警告框
                  props.onHide(); // 關閉 Modal
                }, 1000);
              }
        })
        .catch((err)=>{
            console.log(err)
            alert('請先登入喔～')
            navigate('/LoginPage')
        })
    }
    

    useEffect(()=>{
        setInfo(props.goodinfo)
    },[props])
    useEffect(() => {
        if (serverURL && serverURL.length > 0) {
          const firstServerURL = serverURL[0].serverurl
          setServerUrl(firstServerURL)
        }
      }, [serverURL])

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
                        src={`${serverUrl}${info.food_pic}`}
                        alt={info.food_pic}
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
                  <Button type="button" onClick={() => addCartHandler(info.gid)}>
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