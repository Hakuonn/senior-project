import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Modal } from 'react-bootstrap';
import { Table, Tabs } from 'antd'; // 移除了 Badge 的引用
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import Axios from '../../../components/Axios';
import dayjs from 'dayjs';
import '../../../css/uberEat_store.css'


/**
 * 商家歷史訂單頁面
 **/

function StoreOrderHistory() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 獲取歷史訂單
  const getHistoryOrders = () => {
    Axios()
      .get('order/store/allOrder/')
      .then((res) => {
        const data = res.data;
        setDataSource(data);
      })
      .catch((err) => {
        console.error('Error fetching history orders:', err);
      });
  };

  const columns = [
    {
      title: '顧客名稱',
      dataIndex: 'member_name',
      key: 'member_name',
    },
    {
      title: '聯絡方式',
      dataIndex: 'member_phone',
      key: 'member_phone',
    },
    {
      title: '訂單總額',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: '取餐號碼',
      dataIndex: 'take_order_key',
      key: 'take_order_key',
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
    getHistoryOrders();
  }, []);

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <>
        <p>顧客名稱: {selectedOrder.member_name}</p>
        <p>聯絡方式: {selectedOrder.member_phone}</p>
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
      <StoreKanBan />
      <div className="storeOrder">
        <Container fluid  className='store-add-new-product'>
          <h1>歷史訂單</h1>
          <div className="order-div">
            {dataSource.length > 0 ? (
              <Tabs defaultActiveKey="1">
                {/* 顯示已完成訂單 */}
                <Tabs.TabPane tab="已完成" key="1">
                  <Table
                    dataSource={dataSource.filter((order) => order.status === 'complete')}
                    columns={columns}
                  />
                </Tabs.TabPane>

                {/* 顯示已取消訂單 */}
                <Tabs.TabPane tab="已取消" key="2">
                  <Table
                    dataSource={dataSource.filter((order) => order.status === 'cancelled')}
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

export default StoreOrderHistory;
