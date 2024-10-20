import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { BiLogoVisa } from 'react-icons/bi'
import { BiLogoMastercard } from 'react-icons/bi'
import { FaRegMoneyBill1 } from 'react-icons/fa6'
import Axios from '../Axios'

function Pay({setPayment}) {
  const [payMethod, setPayMethod] = useState('到店取付')
  const handlePayMethodChange = (e) => {
    setPayMethod(e.target.value)
  }
  useEffect(()=>{
    setPayment(payMethod)
  },[payMethod])

  return (
    <Container fluid>
    <Form>
      <Row>
        <Col>
          <Form.Check
          type="radio"
          name='payment'
          id="cash"
          value="到店取付"
          label="到店取付"
          defaultChecked
          onChange={handlePayMethodChange}
          />
          <span style={{fontSize:'80px'}}><FaRegMoneyBill1/></span>
        </Col>
        <Col>
          <Form.Check
          type="radio"
          name='payment'
          id="credit"
          value="信用卡"
          label="信用卡(此功能尚未開放喔～)"
          disabled
          onChange={handlePayMethodChange}
          />
          <span style={{fontSize:'80px'}}><BiLogoVisa/><BiLogoMastercard/></span> 
        </Col>
      </Row>
    </Form>
    </Container>
  )
}

export default Pay