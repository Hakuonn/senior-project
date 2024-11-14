import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';


/**
 * 沒圖片 要修改
 * @param {} param0 
 * @returns 
 */
function ProductItem({ item, onEdit, onAvailable, onUnavailable, onDelete }) {
  const [status, setStatus] = useState(item.status);

  return (
    <Col>
      <Card key={item.id}>
        <Card.Img variant="top" src={``} className='store-product-card-img' />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {status === true ? (
              <span style={{ color: 'green' }}>上架中</span>
            ) : (
              <span style={{ color: 'red' }}>下架中</span>
              
            )}
            <br />
            價格：{item.price}
            <br />
            數量：{item.quantity}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Container>
            <Row>
              <Col>
                <Button variant="outline-primary" className='store-product-buttons' onClick={() => onEdit(item)}>編輯</Button>
              </Col>
              <Col>
                {status === true ? (
                  <Button variant='outline-warning' className='store-product-buttons' onClick={() => onUnavailable(item.id)}>下架</Button>
                ) 
                : 
                (
                  <Button variant='outline-success' className='store-product-buttons' onClick={() => onAvailable(item.id)}>上架</Button>
                )}
              </Col>
              <Col>
                <Button variant="outline-danger" className='store-product-buttons' onClick={() => onDelete(item.id)}>刪除</Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default ProductItem;
