// StoreCancelOrder.js
import React, { useState } from 'react';
import { Modal, Checkbox, Input } from 'antd';
import Axios from './Axios';

function StoreCancelOrder({ visible, onCancel, orderId, onOrderCancelled }) {
  const [cancelReason, setCancelReason] = useState([]);
  const [otherReason, setOtherReason] = useState("");

  const cancelReasons = ["食材不足", "訂購時間過晚", "其他"];

  const handleOk = () => {
    const reasonToSubmit = cancelReason.includes("其他")
      ? [otherReason, ...cancelReason]
      : cancelReason;

    Axios()
      .post('/order/cancel/', JSON.stringify({
        oid: orderId,
        msg: reasonToSubmit.join(', '),
      }))
      .then((response) => {
        if (response.status === 200) {
          onOrderCancelled(orderId, "已取消");
          onCancel();
          setTimeout(()=>{
            onOrderCancelled(orderId)
          },3000)
        }
      })
      .catch((error) => {
        console.error("取消訂單失敗", error);
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title="取消訂單理由"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Checkbox.Group
        options={cancelReasons}
        value={cancelReason}
        onChange={(checkedValues) => {
          setCancelReason(checkedValues);
        }}
      />
      {cancelReason.includes("其他") && (
        <Input
          type="text"
          value={otherReason}
          onChange={(e) => setOtherReason(e.target.value)}
          placeholder="其他理由"
        />
      )}
    </Modal>
  );
}

export default StoreCancelOrder;
