import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import KanBan from '../../../components/nav_and_footer/KanBan';

import Axios from '../../../components/Axios.js'

function CommonQAPage() {
  const [storeQA,setStoreQA] = useState(null)
  const [consumerQA,setConsumerQA] = useState(null)

  // 載入後，與後端拿取資料
  useEffect(() => {
    Axios().get("QA/buyer_questions/")
    .then((res) => {
      setConsumerQA(res.data)
    })
    Axios().get("QA/seller_questions/")
    .then((res) => {
      setStoreQA(res.data)
    })
  } , [])

  return (
    <>
      <KanBan />
        <Container className='QA'>
          <h1>Q & A</h1>
          <Tabs
            defaultActiveKey="消費者"
            id="QA-tab"
            className="mb-3"
            variant="underline"
            justify
          >
            <Tab eventKey="消費者" title="消費者">
              {consumerQA &&
                consumerQA.map((item) => (
                  <div key={item.id} className='QA-div-card mt-5 mb-5'>
                    <Card className='p-3'>
                      <Card.Body>
                        <Card.Title>{item.question_text}</Card.Title>
                        {item.answers.map((ans) => (
                          <Card.Text>{ans.answer_text}</Card.Text>
                        ))}
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="商家" title="商家">
              {storeQA &&
                storeQA.map((item) => (
                  <div key={item.id} className='QA-div-card mt-5 mb-5'>
                    <Card className='p-3'>
                      <Card.Body>
                      <Card.Title>{item.question_text}</Card.Title>
                        {item.answers.map((ans) => (
                          <Card.Text>{ans.answer_text}</Card.Text>
                        ))}
                      </Card.Body>
                    </Card>
                  </div>
                ))
              }
            </Tab>
          </Tabs>
        </Container>
    </>
  );
}

export default CommonQAPage;
