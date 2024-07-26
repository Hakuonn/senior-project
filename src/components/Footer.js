import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaInstagram, FaSquareFacebook } from "react-icons/fa6"
import { Link } from "react-router-dom";

/***
*就只是一個Footer頁尾而已
***/
function Footer() {
  return (
    <div className='footer'>
    <Container fulid>
        <Row>
            <Col>
                <h2>環飽EcoBǎo</h2>
                <ul>
                    <li>地址：824004 高雄市燕巢區深中路58號</li>
                    <li>電話：0966-683-955</li>
                </ul>
            </Col>

            <Col>
                <h2>聯絡我們</h2>
                <ul>
                    <li>電子信箱：c110156217@nkust.edu.tw</li>
                    <li>營業時間：一 ～ 五　09：00 ~ 18：00（國定假日及週末未營業，敬請見諒）</li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col>
                <Link to="https://www.facebook.com/profile.php?id=100092980359814" className='footer-link'><FaSquareFacebook size={30} className='footer-icon'/></Link>
                <Link to="https://www.instagram.com/0625.squafaccce/" className='footer-link'><FaInstagram size={30} className='footer-icon'/></Link>
            </Col>
        </Row>
        
    </Container>
    </div>
  )
}

export default Footer