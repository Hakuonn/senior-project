import React, { useEffect, useState } from 'react';
import KanBan from 'components/nav_and_footer/KanBan';
import { Button, Container, Modal } from 'react-bootstrap'; // 引入 react-bootstrap 的 Modal
import { message, Steps } from 'antd';

// components
import Bill from 'components/uberEat_C_C/CheckOut/Bill';
import Pay from 'components/uberEat_C_C/CheckOut/Pay';
import Almost from 'components/uberEat_C_C/CheckOut/Almost';
import Axios from 'components/Axios';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
// 拿取購物車的項目
import { useLocation } from 'react-router-dom';

function CheckOutPage() {
  
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(null);
  // 付款方式
  const [payment, setPayment] = useState(null);
  // 預計時間
  const [time,setTime] = useState(null)
  // 訂單註記
  const [orderNote,setOrderNote] = useState('')

  const [showModal, setShowModal] = useState(false); // 使用 show/hide 状态来控制 Modal 显示

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const submitHandler = () => {
    const cartIds = data.map((item) => item.id);

    // 後端傳送格式
    //{
    //  "cart_item_ids": [
    //    0
    //  ],
    //  "delivery_method": "string",
    //  "delivery_address": "string",
    //  "payment_method": "string",
    //  "delivery_notes": "string",
    //  "scheduled_time": "Unknown Type: date-time"
    // }

    Axios()
      .post('order/member/create-from-cart/', JSON.stringify({
        cart_item_ids: cartIds,
        delivery_address:'無',
        payment_method: payment,
        delivery_notes:orderNote,
        scheduled_time:time
      }))
      .then((res) => {
          setShowModal(false);
          alert("訂購成功，請靜待賣家回覆，將會以信件通知您！")
          navigate('/orders');
      })
      .catch((error) => {
        if(error.response.status === 400){
          alert("購物車中產品已被購買完畢！請重新下單～")
          navigate('/Cart')
        } else if (error.response.state === 404){ 
          alert("產品可能已經下架，請重新下單～")
          navigate('/Cart')
        }
      });
  };
  
  useEffect(() => {

    Axios().get("/order/cart/get/",{
      params:{
        'cartItems':state.goods_id.toString()
      }
    })
    .then((res) => {
      setData(res.data)
    })

  },[])
  
  const steps = [
    {
      title: '確認訂單',
      content: <Bill data={data} />,
    },
    {
      title: '支付方式以及其他',
      content: <Pay 
      setPayment={setPayment}
      setTime={setTime} 
      setOrderNote={setOrderNote} />,
    },
    {
      title: '確認完成',
      content: <Almost 
                data={data}
                payment={payment} 
                time={time} 
                orderNote={orderNote} 
                 />,
      },
    ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const nextClick = () => {
    setCurrent(current + 1);
  };

  const prevClick = () => {
    setCurrent(current - 1);
  };

  return (
    <>
      <KanBan />
      <div className='checkout-page'>
        <Container fulid>
          <h1>結帳</h1>
          <div className='checkout-steps'>
            <Steps current={current} items={items} />
          </div>
          <div className='checkout-content'>
            {steps[current].content}
          </div>
          <div>
            {current < steps.length - 1 && (
              <Button type='primary' onClick={() => nextClick()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <>
                <Button type='primary' onClick={() => setShowModal(true)}> {/* 点击按钮显示 Modal */}
                  確認送出訂單！
                </Button>
                <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static"> {/* 使用 react-bootstrap Modal */}
                  <Modal.Header closeButton>
                    <Modal.Title><ExclamationCircleFilled /> 確認送出</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>確認要送出訂單嗎？送出後即無法更改</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>取消</Button>
                    <Button variant="primary" onClick={() => submitHandler()}>確認送出</Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prevClick()}>
                上一步
              </Button>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default CheckOutPage;