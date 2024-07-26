import React from 'react'
import { Card } from 'react-bootstrap'
import { Rating } from '@mui/material'

function Comment({id, name, star, explain, date}) {
  
  return (
    <div className='customer-feedback'>
        <Card key={id}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{explain}</Card.Text>
                <Rating name="read-only" value={star} readOnly size='large'/>
            </Card.Body>
            <Card.Footer>撰寫時間：{date}</Card.Footer>
        </Card>
    </div>
  )
}

export default Comment