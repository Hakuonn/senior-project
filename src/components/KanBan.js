import React, { useState, useRef, useEffect } from 'react';
import { Container, Nav, Navbar, Overlay, Tooltip, Button } from 'react-bootstrap';
import { VscAccount } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import Axios from './Axios';

function KanBan() {
  const navigate = useNavigate();
  const jwtToken = window.localStorage.getItem('jwt');

  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleNavigate = (url) => {
    setShouldNavigate(true);
    navigate(url);
  }

  const isValid = (url) => {
    const action = 'api/token/verify/';
    Axios().post(action, JSON.stringify({ token: jwtToken }))
      .then((res) => {
        if (res.status === 200) {
          handleNavigate(url);
        }
      })
      .catch((err) => {
        alert('請先登入喔～');
        navigate('/LoginPage');
      });
  }

  const LogIn = () => {
    const w = window.open("/LoginPage", '_self');
  }

  const LogOut = () => {
    window.localStorage.removeItem('jwt');
    alert('您已登出');
    navigate('/');
    window.location.reload();
  }

  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light" fixed='top'>
        <Container>
          <Navbar.Brand href="/" className='nav-brand'>
            <img
              alt=""
              src="/logo.png"
              width="85"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            環飽EcoBǎo
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              <Nav.Link href="/">主頁</Nav.Link>
              <Nav.Link href='/Activity'>活動專區</Nav.Link>
              <Nav.Link href='/About'>關於我們</Nav.Link>
              <Nav.Link href="/CommonQA">常見問題</Nav.Link>
              <Nav.Link href="/Menu">查看美食</Nav.Link>
              <Nav.Link onClick={() => isValid("/cart")}>購物車</Nav.Link>
              <Button variant="outline-success" ref={target} onClick={() => setShow(!show)}><VscAccount size={30} /></Button>
              <Overlay
                target={target.current}
                show={show}
                placement="bottom"
                style={{ backgroundColor: 'white' }}
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    <br />
                    <Link className='nav-to-profile' onClick={() => isValid("/UserProfile")}>
                      我的主頁
                    </Link>
                    <br />
                    <br />
                    <Link className='nav-to-profile' onClick={() => isValid("/orders")}>
                      我的訂單
                    </Link>
                    <br />
                    <br />
                    {jwtToken === 'None' || jwtToken === null?
                      <Link className='nav-to-profile' onClick={() => LogIn()}>
                        登入
                      </Link>
                      :
                      <Link className='nav-to-profile' onClick={() => LogOut()}>
                        登出
                      </Link>
                    }
                    <br />
                    <br />
                  </Tooltip>
                )}
              </Overlay>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='navbar-div'></div>
    </div>
  )
}

export default KanBan;
