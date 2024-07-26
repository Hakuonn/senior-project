import React from 'react';
import { Button } from 'react-bootstrap';
import Axios from '../Axios';

function CartDelete({ cartid, onUpdateDataSource }) {
  const deleteHandler = () => {
    Axios().post('/cart/delete/', JSON.stringify({
        cart_id: cartid,
      }))
      .then(() => {
        onUpdateDataSource((prevDataSource) => prevDataSource.filter(item => item.cart_id !== cartid));
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Button variant='outline-danger' onClick={deleteHandler}>刪除</Button>
  );
}

export default CartDelete;