import React from 'react'
import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap'
import AboutTeam from './aboutPages/AboutTeam'
import AboutVision from './aboutPages/AboutVision'
import AboutEcobao from './aboutPages/AboutEcobao'
import AboutSDGs from './aboutPages/AboutSDGs'
import KanBan from '../../components/KanBan'

function About() {
  return (
    <>
      <KanBan/>
      <div className='about'>
        <Container fluid>
          <h1>關於我們</h1>
          <Tab.Container defaultActiveKey="#vision">
            <Row>
              <Col xs={12} md={2}>
              <ListGroup className='about-list-group'>
                <ListGroup.Item action href="#vision" variant="light">環飽願景</ListGroup.Item>
                <ListGroup.Item action href="#ecobao" variant="light">關於環飽EcoBǎo</ListGroup.Item>
                {/* <ListGroup.Item action href="#team" variant="light">關於團隊</ListGroup.Item> */}
                <ListGroup.Item action href="#sdgs" variant="light">SDGs</ListGroup.Item>
              </ListGroup>
              </Col>
              <Col xs={12} md={10}>
                <div className='about-right-div'>
                  <Tab.Content>
                    <Tab.Pane eventKey="#vision"><AboutVision/></Tab.Pane>
                    <Tab.Pane eventKey="#ecobao"><AboutEcobao/></Tab.Pane>
                    <Tab.Pane eventKey="#team"><AboutTeam/></Tab.Pane>
                    <Tab.Pane eventKey="#sdgs"><AboutSDGs/></Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  )
}


export default About