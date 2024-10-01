import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Modal } from 'react-bootstrap';
import { Table, Tabs } from 'antd'; // 刪除訂單狀態的引用
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import Axios from '../../../components/Axios';
import dayjs from 'dayjs';
import '../../../css/uberEat_store.css'


/**
 * 商家訂單管理
 **/

function StoreOrder() {
  const [dataSource, setDataSource] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getOrder = () => {
    Axios()
      .get('order/store/allOrder/') 
      .then((res) => {
        let data = res.data;
        if (data === '店家尚未收到任何訂單') {
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
      title: '顧客名稱',
      dataIndex: 'member_name',
      key: 'member_name',
    },
    {
      title: '聯絡方式',
      dataIndex: 'customer_contact',
      key: 'customer_contact',
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
        <>
          <Button variant="primary" onClick={() => handleModalOpen(record)}>
            查看詳細
          </Button>
        </>
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

  // 使用 PUT 更新訂單狀態
  const updateOrderStatus = (status) => {
    Axios()
      .patch(`/order/store/status/`, { order_id: selectedOrder.id, status }) // 確保傳送正確的格式
      .then((res) => {
        getOrder(); // 更新訂單列表
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.error('Error updating order status:', err);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <>
        <p>顧客名稱: {selectedOrder.member_name}</p>
        <p>聯絡方式: {selectedOrder.customer_contact}</p>
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

  // 定義下一個訂單狀態的對應
  const nextStatusMap = {
    pending: { nextStatus: 'confirmed', label: '標記為已確認' },
    confirmed: { nextStatus: 'preparing', label: '標記為準備中' },
    preparing: { nextStatus: 'ready', label: '標記為可拿取' },
    ready: { nextStatus: 'complete', label: '標記為已完成' },
    complete: null, // 已完成沒有下一個階段
    cancelled: null, // 已取消的訂單也沒有下一個階段
  };

  return (
    <>
      <StoreKanBan />
      <div className="storeOrder">
        <Container fluid  className='store-add-new-product'>
          <h1>商家訂單管理</h1>
          <div className="order-div" >
            {dataSource.length > 0 ? (
              <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="待確認" key="1">
                <Table
                  dataSource={dataSource.filter((order) => order.status === 'pending')}
                  columns={columns}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="已確認" key="2">
                <Table
                  dataSource={dataSource.filter((order) => order.status === 'confirmed')}
                  columns={columns}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="準備中" key="3">
                <Table
                  dataSource={dataSource.filter((order) => order.status === 'preparing')}
                  columns={columns}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="可拿取" key="4">
                <Table
                  dataSource={dataSource.filter((order) => order.status === 'ready')}
                  columns={columns}
                />
              </Tabs.TabPane>
            </Tabs>
            
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title>目前無任何訂單</Card.Title>
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
          {/* 根據目前狀態顯示下一個階段按鈕 */}
          {selectedOrder && nextStatusMap[selectedOrder.status] ? (
            <Button
              variant="primary"
              onClick={() => updateOrderStatus(nextStatusMap[selectedOrder.status].nextStatus)}
            >
              {nextStatusMap[selectedOrder.status].label}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>

      </div>
    </>
  );
}

export default StoreOrder;
