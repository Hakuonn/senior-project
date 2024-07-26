import React from 'react'
import { Spinner } from 'react-bootstrap'

function WaitAMin() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default WaitAMin