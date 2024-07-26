import React from 'react'
import { Card, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useFetch from '../../hooks/useFetch';
import KanBan from '../../components/KanBan';

function CommonQA() {
    const {data: cQA} = useFetch("http://localhost:8002/consumerQA")
    const {data: sQA} = useFetch("http://localhost:8002/storeQA")
    
  return (
    <>
        <KanBan/>
        <div className='QA-div'>
            <Container fluid>
                <h1>Q & A</h1>
                <Tabs
                defaultActiveKey="消費者"
                id="QA-tab"
                className="mb-3"
                variant="underline"
                justify
                >
                    <Tab eventKey="消費者" title="消費者">
                        {cQA &&
                        cQA.map((item)=>(
                            <div key={item.id} className='QA-div-card'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{item.Q}</Card.Title>
                                        <Card.Text>{item.A}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                        }
                    </Tab>
                    <Tab eventKey="商家" title="商家">
                        {sQA &&
                        sQA.map((item)=>(
                            <div key={item.id} className='QA-div-card'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{item.Q}</Card.Title>
                                        <Card.Text>{item.A}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                        }
                    </Tab>
                </Tabs>
            </Container>
        </div>
    </>
  )
}

export default CommonQA