import React from 'react'
import { Container, Tab, ListGroup, Row, Col } from 'react-bootstrap'
import MyProfile from './userProfile/MyProfile'
import MyAllergen from './userProfile/MyAllergen'
import KanBan from '../../components/KanBan'
import MyPassword from './userProfile/MyPassword'
import MyPreference from './userProfile/MyPreference'


/*** 
 * 使用者的個人頁面
 ***/
function UserProfile() {
  return (
    <>
    <KanBan/>
    <div className='user-profile'>
    <Container fluid>
        <Tab.Container defaultActiveKey="#profile">
            <Row>
              <Col xs={12} md={2}>
              <ListGroup className='user-profile-list-group'>
                <ListGroup.Item action href="#profile" variant="light">個人頁面</ListGroup.Item>
                <ListGroup.Item action href="#allergen" variant="light">過敏原管理</ListGroup.Item>
                <ListGroup.Item action href="#preference" variant="light">飲食偏好</ListGroup.Item>
                <ListGroup.Item action href="#passwd" variant="light">密碼設置</ListGroup.Item>
              </ListGroup>
              </Col>
              <Col xs={12} md={10}>
                <div className='about-right-div'>
                  <Tab.Content>
                    <Tab.Pane eventKey="#profile"><MyProfile/></Tab.Pane>
                    <Tab.Pane eventKey="#allergen"><MyAllergen/></Tab.Pane>
                    <Tab.Pane eventKey="#preference"><MyPreference/></Tab.Pane>
                    <Tab.Pane eventKey="#passwd"><MyPassword/></Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
          </Tab.Container>
    </Container>
    </div>
    </>
  )
}

export default UserProfile