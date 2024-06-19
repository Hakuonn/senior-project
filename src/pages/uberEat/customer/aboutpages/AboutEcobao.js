import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import AboutBuilder from '../../../components/AboutBuilder'


/***
 * 關於EcoBao page
 ***/
function AboutEcobao() {
  const chapter1 = {
    "title": "我們的理念",
    "content": "環飽EcoBǎo並不想浪費這些剩食，透過零剩食與綠色友善的概念結合而成，我們希望透過環飽EcoBǎo來減少剩食，除了結合近年來為人所知的零剩食概念，也透過基礎健康管理來排除食用者的過敏原等，希望減少剩食之餘，讓消費者吃得安心、吃得健康。",
    "img": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "imgAlt": "idea",
    "mode": true
  }
  const chapter2 = {
    "title": "命名發想",
    "content": "名字靈感發想自環保，以諧音方式取叫「環飽」，希望大家能吃得健康也吃得飽飽。而英文則是以eco-friendly的「eco」與「飽」的羅馬拼音「Bǎo」結合而成。",
    "img": "https://i.imgur.com/nHRzEcD.gif",
    "imgAlt": "name-dream",
    "mode": false
  }

  const chapter3 = {
    "title": "Logo設計",
    "content": "民以食為天，寶島台灣最著名的特色就是美食可在這塊土地上嚐到各種味道，飽餐一頓而說到飽的諧音就會想到以中式餐飲的著名品項「包子」為設計芳香四溢、油而不膩而本平台集結各種店家利用剩食做成各種美食環境汙染、資源不浪費是大家關注的特點將剩食轉為經濟，讓世界變得更好",
    "img": "https://i.imgur.com/L94MYdu.gif",
    "imgAlt": "name-dream",
    "mode": true
  }

  return (
    <Container fluid className='vision-container'>
      <Row>
        <Col><h1 className='subject-h1'>關於環飽EcoBǎo</h1></Col>
      </Row>
      <AboutBuilder chapter={chapter1}/>
      <div className='ecobao'>
        <AboutBuilder chapter={chapter2}/>
      </div>
      <AboutBuilder chapter={chapter3}/>
    </Container>
  )
}

export default AboutEcobao