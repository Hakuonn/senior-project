import React from 'react'
import { Image, Col } from 'react-bootstrap'


function EmptyState({src}) {
  return (
    <Col xs={12} md={12}>
    <Image src={src} rounded fluid/>
    </Col>
  )
}

export default EmptyState