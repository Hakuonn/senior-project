import React, { useEffect, useState } from 'react'
import StoreKanBan from '../../components/StoreKanBan'
import { Container, Card } from 'react-bootstrap'
import { Rating } from '@mui/material'
import Axios from '../../components/Axios'


function StoreCustomerFeedback() {
    const [dataSource, setDataSource] = useState(null)
    
    console.log(dataSource)
    const getData = () =>{
        Axios().get('/store_data/Eva/')
        .then((res)=>{
            let data = res.data
            setDataSource(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <>
    <StoreKanBan/>
    <div className='storeIndex'>
        <Container fluid>
            <h1>商家評價查詢</h1>
            <div className='customer-feedback'>
                {dataSource && dataSource !== '無資料'?
                dataSource.map((item)=>(
                    <Card key={item.evaid} className='mb-3'>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.explain}</Card.Text>
                            <Rating name="read-only" value={item.star} readOnly size='large'/>
                        </Card.Body>
                        <Card.Footer>撰寫時間：{item.date}</Card.Footer>
                    </Card>
                ))
                :
                <Card>
                    <Card.Body>
                        <Card.Title>目前無任何評論喔～</Card.Title>
                    </Card.Body>
                </Card>
                }
                
            </div>
        </Container>
    </div>
    </>
  )
}

export default StoreCustomerFeedback