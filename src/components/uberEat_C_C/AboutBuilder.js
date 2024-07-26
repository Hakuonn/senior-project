import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'


/*** 
 * about內文建構器，mode(true:圖片靠左，內文靠右 ， false:圖片靠右，內文靠左)
 * chapter = {
    "title": string,
    "content": string,
    "img": url,
    "imgAlt": string,
    "mode": bool
  }
***/
function AboutBuilder({chapter}) {
  return (
    <Row className='align-items-center'>
      {chapter.mode ?
      <>
        <Col xs={12} md={4}>
          <Image src={chapter.img} alt={chapter.imgAlt} rounded fluid/>
        </Col>
        <Col xs={12} md={8}>
          <h2 className='about-builder-h2'>{chapter.title}</h2>
          <p>{chapter.content}</p>
        </Col>
      </> 
      :
      <>
        <Col xs={12} md={8}>
          <h2 className='about-builder-h2'>{chapter.title}</h2>
          <p>{chapter.content}</p>
        </Col>
        <Col xs={12} md={4}>
          <Image src={chapter.img} alt={chapter.imgAlt} rounded fluid/>
        </Col>
      </> 
      }
    </Row>
  )
}

export default AboutBuilder