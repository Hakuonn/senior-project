import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AboutBuilder from '../../../components/AboutBuilder'

/***
 * 環飽願景 page
 ***/
function AboutVision() {
  const chapter1 = {
    "title": "減少剩食，從「食」開始",
    "content": "隨時代進步，每個人的飲食品質迅速提升，美食隨處可得，但很多人都忽略了剩食這個問題。商家每天都會準備相應的食材料理，無可避免的是有可能會有剩食產生，許多店家因食安考量會選擇把這些剩食丟棄，這並不是一個好的剩食處理循環。",
    "img": "https://i.imgur.com/jb7VA2u.jpeg",
    "imgAlt": "leftovers",
    "mode": true 
  }
  const chapter2 = {
    "title": "創造永續綠色的未來",
    "content": "在這個日新月異的世界，我們堅信，可持續綠色生活方式是不僅關乎我們自己，更關乎地球的重要使命。且我們也深信每份食物都值得被珍惜，所以致力將剩食重新變為美味佳餚，並鼓勵大眾推廣0剩食的精神。",
    "img": "https://i.imgur.com/Pdd50AY.jpg",
    "imgAlt": "sustainable",
    "mode": false
  }
  const chapter3 = {
    "title": "開發者的話",
    "content": "感謝您加入我們的旅程，成為永續生活的倡導者與改變者。讓我們攜手向前，實現一個更美好的未來，為下一代留下一個更美好、可持續的地球。",
    "img": "https://i.imgur.com/kRAE2Ty.jpeg",
    "imgAlt": "joinUs",
    "mode": true
  }
  
  return (
    <div className='vision-container'>
        <Container fluid>
          <Row>
            <Col><h1>環飽EcoBǎo的願景</h1></Col>
          </Row>
          <Row>
            <AboutBuilder chapter={chapter1}/>
            <div className='ecobao'>
              <AboutBuilder chapter={chapter2}/>
            </div>
            <AboutBuilder chapter={chapter3}/>
          </Row>
          
        </Container>
    </div>
  )
}

export default AboutVision