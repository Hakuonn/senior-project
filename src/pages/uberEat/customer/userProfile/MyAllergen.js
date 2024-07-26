import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Allergen from '../../../components/Allergen';

function MyAllergen() {

  return (
    <Container fluid className='myprofile'>
      <Row>
        <Col xs={1} md={1}>
          {/* <Image src={logo} alt={logo} roundedCircle className='profile-img'/> */}
        </Col>
        <Col xs={8} md={8}>
          <h2>過敏原管理</h2>
          <Allergen getAllergenURL={'member/account/'} putAllergenUrl={'member/update_allergen/'}/>
        </Col>
      </Row>
    </Container>
  )
}

export default MyAllergen;
