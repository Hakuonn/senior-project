import React from 'react'
import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap'

<<<<<<< HEAD
import AboutVision from '../../../components/uberEat_C_C/aboutPages/AboutVision.js'
import AboutEcobao from '../../../components/uberEat_C_C/aboutPages/AboutEcobao.js'
import AboutSd from '../../../components/uberEat_C_C/aboutPages/AboutSd.js'

import KanBan from '../../../components/nav_and_footer/KanBan'
=======
import AboutVision from 'components/uberEat_C_C/aboutPages/AboutVision.js'
import AboutEcobao from 'components/uberEat_C_C/aboutPages/AboutEcobao.js'
import AboutSd from 'components/uberEat_C_C/aboutPages/AboutSd.js'

import KanBan from 'components/nav_and_footer/KanBan'
>>>>>>> origin/main
  

function AboutMePage() {
  return (
    <>
      <KanBan/>
        <Container className='mb-5'>
          <h1>關於我們</h1>
          <Tab.Container defaultActiveKey="#vision">
            <Row>
              <Col xs={12} md={2}>
              <ListGroup className='about-list-group'>
                <ListGroup.Item action href="#vision" variant="light">環飽願景</ListGroup.Item>
                <ListGroup.Item action href="#ecobao" variant="light">關於環飽EcoBǎo</ListGroup.Item>
                <ListGroup.Item action href="#sdgs" variant="light">SDGs</ListGroup.Item>
              </ListGroup>
              </Col>
              <Col xs={12} md={10}>
                <div className='about-right-div'>
                  <Tab.Content>
                    <Tab.Pane eventKey="#vision"><AboutVision/></Tab.Pane>
                    <Tab.Pane eventKey="#ecobao"><AboutEcobao/></Tab.Pane>
                    <Tab.Pane eventKey="#sdgs"><AboutSd/></Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
    </>
  )
}


export default AboutMePage