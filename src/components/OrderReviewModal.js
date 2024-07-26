import React, { useEffect, useState } from 'react';
import { Modal, Button, Rate, Input } from 'antd';
import Axios from './Axios';

function OrderReviewModal({ visible, onOk, onCancel, onRateChange, onCommentChange, orderId }) {
    const [oid , setOid] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const sendReviewToBackend = () => {
        const reviewData = {
          oid: oid,
          star: rating.toString(),
          explain: comment,
        };
    
        Axios().post('/Evaluate/new/', JSON.stringify(reviewData))
          .then((res) => {
            console.log(res.status);
            onOk();
          })
          .catch((err) => {
            console.error('評論發送失敗', err);
          });
      };

      useEffect(()=>{
        setOid(orderId)
      },[orderId])
    return (
    <Modal
      title="撰寫評論"
      visible={visible}
      onOk={()=>sendReviewToBackend()}
      onCancel={onCancel}
    >
        
      <p>星級評分：</p>
      <Rate onChange={value => setRating(value)} />

      <p>評論：</p>
      <Input.TextArea onChange={e => setComment(e.target.value)} />
    </Modal>
  )
}

export default OrderReviewModal