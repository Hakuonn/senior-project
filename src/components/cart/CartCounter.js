import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Axios from '../Axios';

function CartCounter({ data, cartid, onQuantityChange, onUpdateDataSource }) {
  const [amount, setAmount] = useState(data.quantity);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const handleShowDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const deleteHandler = () => {
    Axios().post('/cart/delete/', JSON.stringify({
      cart_id: cartid,
    }))
      .then(() => {
        onUpdateDataSource((prevDataSource) => prevDataSource.filter(item => item.cart_id !== cartid));
        handleHideDeleteModal();
      })
      .catch(error => {
        console.error(error);
        handleHideDeleteModal();
      });
  }

  const amountHandler = (type) => {
    if (type === 'plus' && amount < 3) {
      setAmount(amount + 1);
      updateQuantityOnServer(cartid, amount + 1)
      onQuantityChange(data.cart_id, amount + 1)
    } else if (type === 'minus' && amount > 0) {
      if (amount === 1) {
        // 使用者將數量減為0時顯示刪除確認對話框
        handleShowDeleteModal()
      } else {
        setAmount(amount - 1)
        updateQuantityOnServer(cartid, amount - 1)
        onQuantityChange(data.cart_id, amount - 1)
      }
    }
  }

  const updateQuantityOnServer = (cartId, newQuantity) => {
    Axios().post('/cart/change/', JSON.stringify({
      cart_id: cartId,
      quantity: newQuantity,
    }))
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      });
  }

  useEffect(() => {
    setAmount(data.quantity);
  }, []);

  return (
    <>
      <Button variant="outline-dark" onClick={() => amountHandler('minus')} disabled={amount === 0}>
        -
      </Button>
      <span style={{ margin: "3%" }}>{amount}</span>
      <Button variant="outline-dark" onClick={() => amountHandler('plus')} disabled={amount === 3}>
        +
      </Button>
      <span className='ms-3'>每次最多購買3個</span>

      <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>確認刪除</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          確定要刪除該商品嗎？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideDeleteModal}>
            取消
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            確定刪除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartCounter;
