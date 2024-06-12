import React from 'react'
import { Button } from 'react-bootstrap';

function StatusButton({status, onAvailable, onUnavailable}) {
    return (
      status === true ? (
        <Button variant="outline-success" className='store-product-buttons' onClick={onAvailable}>
          上架
        </Button>
      ) : (
        <Button variant='outline-warning' className='store-product-buttons' onClick={onUnavailable}>
          下架
        </Button>
      )
    );
}

export default StatusButton