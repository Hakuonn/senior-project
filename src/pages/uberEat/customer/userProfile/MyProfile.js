import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import Axios from '../../../components/Axios'
import { useNavigate } from 'react-router-dom'


/*** 
 * 使用者的個人頁面-我的檔案
 ***/
function MyProfile() {
    const [testData, setTestData] = useState(null) // 後端抓取的資料
    //useState
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    
    const nevigate = useNavigate()

    const handleSubmit = (e) =>{
        Axios().post('member/update_account/', JSON.stringify({
            name: name,
            birth: birth,
            email: email,
            phone: phone,
            address: address,
        }))
        .then((res)=>{
            if(res.status === 200){
                alert('修改成功')
            }
        })
        .catch((err)=>{
            alert('請重新登入')
            nevigate('/LoginPage')
        })
    }

    useEffect(()=>{
        Axios().get('member/account/')
        .then((res)=>{
            let data = res.data
            setTestData(data)
            setName(data.name)
            setEmail(data.email)
            setBirth(data.birth)
            setPhone(data.phone)
            setAddress(data.address)
        })
        .catch((err)=>{
            let error = err.response
            if (error.status === 401){
                console.log(err)
                alert('請重新登入')
                nevigate('/LoginPage')
            }
            else{
                alert('unknown error')
            }
            
        })
    },[])

  return (
    <Container fluid className='myprofile'>
        <Row>
            <Col xs={1} md={1}>
                {/* <Image src={logo} alt={logo} roundedCircle className='profile-img'/> */}
            </Col>
            <Col xs={8} md={8}>
                <h2>我的檔案</h2>
                {testData &&
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>姓名</Form.Label>
                        <Form.Control type="text"  value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>生日</Form.Label>
                        <Form.Control type="date"  pattern='yyyy-MM-DD' value={birth} onChange={(e)=>setBirth(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>電話</Form.Label>
                        <Form.Control type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>通訊地址</Form.Label>
                        <Form.Control type="text"  value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleSubmit}>
                        儲存
                    </Button>
                </Form>
                }
            </Col>
        </Row>
    </Container>
  )
}

export default MyProfile