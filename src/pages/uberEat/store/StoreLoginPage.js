import React from 'react'
import { Container, Form, Button, Image, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan'

function StoreLoginPage() {
  return (
    <>
    <StoreKanBan/>
    <div className='login-page'>
        <Container fulid>
            <Row>
                <Col xs={12} sm={6} md={6}>
                    <Image src="https://i.imgur.com/qYd62C9.png" rounded className='login-pic'/>
                </Col>
                <Col xs={12} sm={6} md={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="輸入您的email" />
                            <Form.Text>我們絕不會與其他人分享您的電子郵件。</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>密碼</Form.Label>
                            <Form.Control type="password" placeholder="輸入密碼" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                商家登入
                            </Button>
                        </div>
                    </Form>
                    <div className='login-page-inside-div'>
                        還沒註冊嗎？讓我們立即開始！
                        <Link to="/StoreRegister">
                            <Button variant="outline-dark" type="submit" className='sign-up'>
                                註冊
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>

        </Container>

    </div>
    </>
  )
}

export default StoreLoginPage