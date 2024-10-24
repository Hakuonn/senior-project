import React, { useState } from 'react';
import { Container, Form, Button, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import KanBan from '../../../components/nav_and_footer/KanBan';
import Axios from '../../../components/Axios';

function LoginPage() {
    const [account, setAccount] = useState('');
    const [passwd, setPasswd] = useState('');

    const AfterofLoginClickHandler = () => {
        window.open('/menu', '_self');
    };

    const action = 'member/basic/login/';
    const handleSubmit = (e) => {
        Axios()
            .post(
                action,
                JSON.stringify({
                    account: account,
                    password: passwd,
                })
            )
            .then((res) => {
                if (res.status === 200) {
                    alert('登入成功');
                    window.localStorage.setItem('jwt', res.data['token']);
                    AfterofLoginClickHandler();
                }
            })
            .catch((err) => {
                let error = err.response;
                if (error.status === 401) {
                    alert('帳號或密碼錯誤');
                }
            });
    };
    return (
        <>
            <KanBan />
            <Container fluid className="mt-5 pt-5">
                <Row>
                    <Col xs={12} sm={6} md={6} className="login-pic-container">
                        <Image
                            src="https://i.imgur.com/qYd62C9.png"
                            rounded
                            fluid
                            className="login-pic"
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                        <Form>
                            <Form.Group className="mb-3" controlId="Account">
                                <Form.Label>帳號</Form.Label>
                                <Form.Control
                                    type="account"
                                    placeholder="輸入您的帳號"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Password">
                                <Form.Label>密碼</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="輸入密碼"
                                    value={passwd}
                                    onChange={(e) => setPasswd(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="button" onClick={handleSubmit} size="lg">
                                    使用者登入
                                </Button>
                            </div>
                        </Form>
                        <div className="login-page-inside-div mt-5">
                            還沒註冊嗎？讓我們立即開始！
                            <Link to="/Register">
                                <Button variant="outline-dark" type="button" className="sign-up">
                                    註冊
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginPage;
