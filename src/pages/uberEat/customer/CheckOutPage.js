import React, { useEffect, useState } from 'react';
import KanBan from '../../components/KanBan';
import { Button, Container, Modal } from 'react-bootstrap'; // 引入 react-bootstrap 的 Modal
import { message, Steps } from 'antd';
import Bill from '../../components/bill/Bill';
import Pay from '../../components/bill/Pay';
import Almost from '../../components/bill/Almost';
import Axios from '../../components/Axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function CheckOutPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(null);
  const [payment, setPayment] = useState(null);
  const [showModal, setShowModal] = useState(false); // 使用 show/hide 状态来控制 Modal 显示
  const navigate = useNavigate();

  const getToBack = () => {
    Axios()
      .get('/cart/get/')
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          setData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = () => {
    const cartIds = data.map((item) => item.cart_id);
    Axios()
      .post('/order/add/', JSON.stringify({
        cart_list: cartIds,
        payment_method: payment,
      }))
      .then((res) => {
          setShowModal(false);
          navigate('/orders');
      })
      .catch((error) => {
        console.error('送出訂單失敗', error);
      });
  };

  const steps = [
    {
      title: '確認訂單',
      content: <Bill data={data} />,
    },
    {
      title: '支付方式',
      content: <Pay setPayment={setPayment} />,
    },
    {
      title: '確認完成',
      content: <Almost data={data} payment={payment} />,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const nextClick = () => {
    setCurrent(current + 1);
  };

  const prevClick = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    getToBack();
  }, []);

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