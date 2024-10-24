import React, { useEffect, useState } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import Axios from '../../Axios'
import LoadingSpinner from '../../loadingSpinner'

function Almost({data, payment , time , orderNote}) {

    const [order, setOrder] = useState(null)
    const [storeData,setStoreData] = useState(null)
    const [memberData,setMemberData] = useState(null)
    const [total, setTotal] = useState(0)


    const calTotal = () =>{
      let result = 0
      for (let i = 0; i < data.length; i++) {
        let element = data[i].subtotal;
        result = result + element
      }
      setTotal(result)
    }

    const GetFromBack = () => {
      // 取得使用者資料
      Axios().get('member/info/get/')
        .then((res) => {
          let data = res.data;
          setMemberData(data);
        })
        .catch((err) => {
          console.log("取得會員資料失敗：", err.response ? err.response.data : err.message);
        });
    
      // 取得商家資料
      Axios().get('store/search/id/', {
        params: {
          id: data[0].goods_info.store_id
        }
      })
        .then((res) => {
          setStoreData(res.data);
        })
        .catch((err) => {
          console.log("取得商家資料失敗：", err.response ? err.response.data : err.message);
        });
    };

    useEffect(()=>{
        GetFromBack()
    },[])
    
    useEffect(()=>{
      if (data && data.length > 0) {
          setOrder(data) 
          calTotal() 
      }         
    },[data])
  
  if (data && memberData && storeData){
    return (
      <Container className="my-4">
      <Card>
          <Card.Header>
          <Card.Title>確認您的訂單</Card.Title>
          </Card.Header>
        <Card.Body>
          <Card.Text>訂購人：{memberData.name}</Card.Text>
          <Card.Text>電話：{memberData.phone}</Card.Text>            
        </Card.Body>
        <ListGroup className="list-group-flush">
          <Card.Body>
            <Card.Text>店家：{storeData.name}</Card.Text>
            <Card.Text>店家電話：{storeData.phone}</Card.Text>
            <Card.Text>店家地址：{storeData.address}</Card.Text>    
          </Card.Body>
        </ListGroup>
        <Card.Body>
          <Card.Title>餐點明細</Card.Title>
          <ListGroup className="list-group-flush">
              {order &&
               order.map((item)=>(
              <ListGroup.Item>
                <Card.Text>商品名稱：{item.goods_info.product_name}</Card.Text>
                <Card.Text>商品價格：${item.goods_info.price}</Card.Text>
                <Card.Text>數量：{item.quantity}</Card.Text>
                <Card.Text>小計：{`$${item.subtotal}`}</Card.Text>
              </ListGroup.Item>                
               )) 
              }
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Card.Title>{`總金額：$${total}`}</Card.Title>
          <Card.Subtitle className='mt-3'>支付方式：{payment}</Card.Subtitle>
          <Card.Subtitle className='mt-3'>註記：{orderNote}</Card.Subtitle>
          <Card.Subtitle className='mt-3'>預計取餐：{time}</Card.Subtitle>

        </Card.Footer>
      </Card>
      </Container>
      
    )
  }else{
    <LoadingSpinner></LoadingSpinner>
  }
  
}

export default Almost