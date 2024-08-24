import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { BiLogoVisa } from 'react-icons/bi'
import { BiLogoMastercard } from 'react-icons/bi'
import { FaRegMoneyBill1 } from 'react-icons/fa6'
import Axios from 'components/Axios'

function Pay({setPayment , setTime , setOrderNote }) {
  const [payMethod, setPayMethod] = useState('到店取付')

  const [minDateTime, setMinDateTime] = useState('');

  const handlePayMethodChange = (e) => {
    setPayMethod(e.target.value)
  }
  const handleTextChange = (e) => {
    setOrderNote(e.target.value)
  }
  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  useEffect(()=>{
    setPayment(payMethod)

    // 設置最小日期時間為當前時間後 20 分鐘
    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() + 20);
    const minDateTimeString = currentDateTime.toISOString().slice(0, 16);
    setMinDateTime(minDateTimeString);
    
  },[payMethod])

  return (
    <Container fluid>
    <Form>
      <Row>
        <Col className="my-4">
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
      <Row>

      <Col className="my-4">
        <Form.Group controlId="formDateTime">
          <Form.Label>選擇日期和時間</Form.Label>
              <Form.Control
                      type="datetime-local"
                      name="dateTime"
                      min={minDateTime}
                      onChange={handleTimeChange}
                      required
                  />
          </Form.Group>
      </Col>
        <Col className="my-4">
            <Form.Group controlId="formTextInput">
                <Form.Label>文字輸入</Form.Label>
                <Form.Control
                    type="text"
                    name="textInput"
                    placeholder="輸入一些文字"
                    maxLength={50}
                    onChange={handleTextChange}
                    required
                />
            </Form.Group>    
        </Col>
      </Row>

    </Form>
    </Container>
  )
}

export default Pay