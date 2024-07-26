import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Axios from '../../components/Axios'

function Almost({data, payment}) {
    const [memberName, setMemberName] = useState(null)
    const [memberPhone, setMemberPhone] = useState(null)
    const [order, setOrder] = useState(null)
    const [storeName, setStoreName] = useState(null)
    const [storePhone, setStorePhone] = useState(null)
    const [storeAddress, setStoreAddress] = useState(null)
    const [total, setTotal] = useState(0)
    console.log(order)

    const calTotal = () =>{
      let result = 0
      for (let i = 0; i < data.length; i++) {
        let element = data[i].subtotal;
        result = result + element
      }
      setTotal(result)
    }



    const GetFromBack = () =>{
        Axios().get('member/account/')
        .then((res)=>{
            let data = res.data
            if(data){
            setMemberName(data.name)
            setMemberPhone(data.phone)                
            }

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        GetFromBack()
    },[])
    useEffect(()=>{
      if (data && data.length > 0) {
          setOrder(data)
          setStoreName(data[0].store_name)
          setStorePhone(data[0].store_phone)
          setStoreAddress(data[0].store_address)  
          calTotal() 
      }         
    },[data])
  

  return (
    <>
    <Card>
        <Card.Header>
        <Card.Title>確認您的訂單</Card.Title>
        </Card.Header>
      <Card.Body>
        <Card.Text>訂購人：{memberName}</Card.Text>
        <Card.Text>電話：{memberPhone}</Card.Text>            
      </Card.Body>
      <ListGroup className="list-group-flush">
        <Card.Body>
          <Card.Text>店家：{storeName}</Card.Text>
          <Card.Text>店家電話：{storePhone}</Card.Text>
          <Card.Text>店家地址：{storeAddress}</Card.Text>    
        </Card.Body>
      </ListGroup>
      <Card.Body>
        <Card.Title>餐點明細</Card.Title>
        <ListGroup className="list-group-flush">
            {order &&
             order.map((item)=>(
            <ListGroup.Item>
              <Card.Text>{item.goods_name} ${item.price}</Card.Text>
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
      </Card.Footer>
    </Card>
    </>
  )
}

export default Almost