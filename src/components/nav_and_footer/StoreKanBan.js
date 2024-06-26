import React from 'react';
import {  Nav, Navbar, Container } from 'react-bootstrap';
import { BiStoreAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

function StoreKanBan() {
  const navigate = useNavigate();

  const LogOut = () => {
    window.localStorage.removeItem('jwt');
    alert('您已登出');
    navigate('/');
  }

  return (
      <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light" fixed='top'>
        <Container>
          <Navbar.Brand as={Link} to="/StoreIndex" className='nav-brand'>
            <img
              alt=""
              src="logo.svg"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            環飽EcoBǎo 商家中心
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* 中間留白 */}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/StoreIndex">商家主頁</Nav.Link>
              <Nav.Link as={Link} to="/StoreProduct">商品管理</Nav.Link>
              <Nav.Link as={Link} to="/StoreAddMeal">新增產品</Nav.Link>
              <Nav.Link as={Link} to="/StoreOrder">訂單管理</Nav.Link>
              <Nav.Link as={Link} to="/StoreOrderHistory">歷史訂單查詢</Nav.Link>
              <Nav.Link as={Link} to="/StoreCustomerFeedback">評價查詢</Nav.Link>
              <Nav.Link as={Link} to="/" onClick={LogOut}>登出</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default StoreKanBan;
