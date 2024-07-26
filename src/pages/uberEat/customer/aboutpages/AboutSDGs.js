import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import AboutBuilder from '../../../components/AboutBuilder'



/***
 * SDGs page
 ***/
function AboutSDGs() {
  const chapter1 = {
    "title": "環飽EcoBǎo永續發展",
    "content": "我們期望能夠透過環飽EcoBǎo來對永續發展目標 SDGs能盡一份心力，期望以本平台作為一個出發點，讓大家能更重視永續發展。我們也期望能達成幾項SDGs目標：SDGs-2 消除飢餓、SDGs-12 責任消費與生產。",
    "img": "https://i.imgur.com/kYafn2a.png",
    "imgAlt": "sdgs2_12_17",
    "mode": true
  }
  return (
    <Container>
      <Row>
        <Col>
          <div className='sdgs-head-div'>
            <h1>永續發展目標 SDGs</h1>
            <Image src="https://i.imgur.com/tigUAty.png" alt='sdgsHead' rounded className='sdgs-head'/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='sdgs'>
            <AboutBuilder chapter={chapter1}/>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutSDGs