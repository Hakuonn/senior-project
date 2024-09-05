import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Modal } from 'react-bootstrap';
import { Table, Tabs, Badge } from 'antd';
import KanBan from '../../../components/nav_and_footer/KanBan';
import Axios from '../../../components/Axios';
import dayjs from 'dayjs';

/**
 * 消費者訂單
 **/

function UserOrder() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getOrder = () => {
    Axios()
      .get('/order/member/')
      .then((res) => {
        let data = res.data;
        if (data === '會員為建立任何訂單') {
          setDataSource([]);
        } else {
          setDataSource(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
      });
  };

  const columns = [
    {
      title: '店家名稱',
      dataIndex: 'items',
      key: 'items',
      render: (items) => <span>{items[0].store_name}</span>,
    },
    {
      title: '訂單總額',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          pending: '處理中',
          completed: '已完成',
          cancelled: '已取消',
        };
        return <Badge status="processing" text={statusMap[status]} />;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button variant="primary" onClick={() => handleModalOpen(record)}>
          查看詳細
        </Button>
      ),
    },
  ];

  const handleModalOpen = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <>
        <p>取餐方式: {selectedOrder.delivery_method}</p>
        <p>取餐號碼: {selectedOrder.take_order_key}</p>
        <p>下單時間: {dayjs(selectedOrder.created_at).format('YYYY-MM-DD HH:mm')}</p>
        <p>預定時間: {dayjs(selectedOrder.scheduled_time).format('YYYY-MM-DD HH:mm')}</p>
        <p>支付方式: {selectedOrder.payment_method}</p>
        <p>支付狀態: {selectedOrder.payment_status === 'paid' ? '已付款' : '未付款'}</p>
        <div>
          <h5>訂單項目:</h5>
          {selectedOrder.items.map((item, index) => (
            <div key={index}>
              <p>品名: {item.goods_name}</p>
              <p>數量: {item.quantity}</p>
              <p>購買價格: {item.price}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <KanBan />
      <div className="userOrder">
        <Container fluid>
          <h1>我的訂單</h1>
          <div className="order-div">
            {dataSource.length > 0 ? (
              <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="未完成" key="1">
                <Table
                  dataSource={dataSource.filter((order) => order.status !== 'complete' && order.status !== 'cancelled')}

                  columns={columns}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="已完成" key="2">
                <Table
                  dataSource={dataSource.filter((order) => order.status === 'complete')}
                  columns={columns}
                />
              </Tabs.TabPane>
            </Tabs>
            
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title>目前無任何歷史訂單</Card.Title>
                </Card.Body>
              </Card>
            )}
          </div>
        </Container>

        {/* Bootstrap Modal for order details */}
        <Modal show={isModalVisible} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>訂單詳細資料</Modal.Title>
          </Modal.Header>
          <Modal.Body>{renderOrderDetails()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              關閉
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default UserOrder;
