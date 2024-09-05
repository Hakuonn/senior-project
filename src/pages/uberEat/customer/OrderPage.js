import React, { useEffect, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { Table, Tabs, Badge } from 'antd';
import KanBan from '../../../components/nav_and_footer/KanBan';
import Axios from '../../../components/Axios';
import ReviewModal from '../../../components/uberEat_C_C/Order/OrderReviewModal';
import dayjs from 'dayjs';

/**
 * 消費者訂單
 **/

function UserOrder() {
  const [dataSource, setDataSource] = useState([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleReviewClick = (order) => {
    setSelectedOrder(order);
    setIsReviewModalVisible(true);
  };

  const handleReviewSubmit = () => {
    setIsReviewModalVisible(false);
  };

  const handleReviewCancel = () => {
    setIsReviewModalVisible(false);
  };

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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '會員',
      dataIndex: 'member',
      key: 'member',
      render: (member) => <span>{member}</span>,
    },
    {
      title: '店家',
      dataIndex: 'items',
      key: 'items',
      render: (items) => <span>{items[0].store_name}</span>,
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
      title: '取餐方式',
      dataIndex: 'delivery_method',
      key: 'delivery_method',
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
      title: '下單時間',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '預定時間',
      dataIndex: 'scheduled_time',
      key: 'scheduled_time',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '支付方式',
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: '支付狀態',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status) => {
        const paymentStatusMap = {
          pending: '未付款',
          paid: '已付款',
        };
        return <Badge status="processing" text={paymentStatusMap[status]} />;
      },
    },
    {
      title: '訂單項目',
      dataIndex: 'items',
      key: 'items',
      render: (OrderItems) => (
        <>
          {OrderItems.map((item, index) => (
            <div key={index}>
              <p>品名: {item.goods_name}</p>
              <p>數量: {item.quantity}</p>
              <p>購買價格: {item.price}</p>
            </div>
          ))}
        </>
      ),
    },
  ];

  const { TabPane } = Tabs;

  const filterOrdersByStatus = (orders, status) => {
    return orders.filter((order) => order.status === status);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <KanBan />
      <div className="userOrder">
        <Container fluid>
          <h1>我的訂單</h1>
          <div className="order-div">
            {dataSource.length > 0 ? (
              <div className="order-div">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="未接單" key="1">
                    <Table
                      dataSource={filterOrdersByStatus(dataSource, 'pending')}
                      columns={columns}
                    />
                  </TabPane>
                  <TabPane tab="已接單" key="2">
                    <Table
                      dataSource={filterOrdersByStatus(dataSource, 'completed')}
                      columns={columns}
                    />
                  </TabPane>
                  <TabPane tab="未取餐" key="3">
                    <Table
                      dataSource={filterOrdersByStatus(dataSource, '未取餐')}
                      columns={columns}
                    />
                  </TabPane>
                  <TabPane tab="已完成" key="4">
                    <Table
                      dataSource={filterOrdersByStatus(dataSource, 'completed')}
                      columns={columns}
                    />
                  </TabPane>
                  <TabPane tab="已取消" key="5">
                    <Table
                      dataSource={filterOrdersByStatus(dataSource, 'cancelled')}
                      columns={columns}
                    />
                  </TabPane>
                </Tabs>
              </div>
            ) : (
              <Card>
                <Card.Body>
                  <Card.Title>目前無任何歷史訂單</Card.Title>
                </Card.Body>
              </Card>
            )}
          </div>
        </Container>
        <ReviewModal
          visible={isReviewModalVisible}
          onOk={handleReviewSubmit}
          onCancel={handleReviewCancel}
          onRateChange={(value) => setReviewRating(value)}
          onCommentChange={(e) => setReviewComment(e.target.value)}
          orderId={selectedOrder?.id}
        />
      </div>
    </>
  );
}

export default UserOrder;
