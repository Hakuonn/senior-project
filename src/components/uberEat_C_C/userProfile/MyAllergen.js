import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import Allergen from '../../../components/Allergen';

function MyAllergen() {

  const allergen = [
    { id: "eggs", label: "蛋" },
    { id: "milk", label: "奶" },
    { id: "gluten", label: "麩質" },
    { id: "Glycine-max", label: "大豆" },
    { id: "peanut", label: "花生" },
    { id: "almond", label: "杏仁" },
    { id: "crustaceans", label: "甲殼類" },
    { id: "fish", label: "魚" },
    { id: "mango", label: "芒果" },
    { id: "sesame", label: "芝麻" },
    { id: "pecan", label: "胡桃" },
    { id: "walnut", label: "核桃" },
    { id: "cashew", label: "腰果" },
    { id: "hazelnut", label: "榛果" },
    { id: "SO2", label: "二氧化硫（亞硫酸鹽）" }
];

  return (
    // <Container fluid className='myprofile'>
    //   <Row>
    //     <Col xs={1} md={1}>
    //       {/* <Image src={logo} alt={logo} roundedCircle className='profile-img'/> */}
    //     </Col>
    //     <Col xs={8} md={8}>
    //       <h2>過敏原管理</h2>
    //       <Allergen getAllergenURL={'member/account/'} putAllergenUrl={'member/update_allergen/'}/>
    //     </Col>
    //   </Row>
    // </Container>
    <Container>
        功能還沒開放喔
    </Container>
  )
}

export default MyAllergen;