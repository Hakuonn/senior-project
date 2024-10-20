<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Button, Container, Card, Modal } from 'react-bootstrap';
import { Table, Tabs, Badge } from 'antd';
import KanBan from '../../../components/nav_and_footer/KanBan';
import Axios from '../../../components/Axios';
import dayjs from 'dayjs';
=======
import React, { useEffect, useState } from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import { Table, Tabs } from 'antd';
import KanBan from 'components/nav_and_footer/KanBan'
import Axios from 'components/Axios';
import ReviewModal from 'components/uberEat_C_C/Order/OrderReviewModal';
>>>>>>> origin/main

/**
 * 消費者訂單
 **/

function UserOrder() {
<<<<<<< HEAD
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
=======
  const [dataSource, setDataSource] = useState(null)
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  console.log(dataSource)
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
  const getOrder = () =>{
    Axios().get('/order/member/')
  .then((res)=>{
    let data = res.data
    console.log(data)
    if (data === "會員為建立任何訂單") {
      setDataSource([])
    }else{
      setDataSource(data)
    }
    
  })
  .catch((err)=>{
    console.log(err)
  })
  }
  
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '店家',
      dataIndex: 'orderfoods',
      key: 'orderfoods',
      render: (orderfoods) => (
        <p>{orderfoods[0].store_name}</p>
      )
    },
    {
      title: '品名',
      dataIndex: 'orderfoods',
      key: 'orderfoods',
      render: (orderfoods) => (
        <>
          {orderfoods.map((item, index) => (
            <p key={index}>{item.goods_name}</p>
          ))}
        </>
      ),
    },
    {
      title: '價格',
      dataIndex: 'orderfoods',
      key: 'orderfoods',
      render: (orderfoods) => (
        <>
          {orderfoods.map((item, index) => (
            <p key={index}>{item.subtotal}</p>
          ))}
        </>
      )
    },
    {
      title: '數量',
      dataIndex: 'orderfoods',
      key: 'orderfoods',
      render: (orderfoods) => (
        <>
          {orderfoods.map((item, index) => (
            <p key={index}>{item.quantity}</p>
          ))}
        </>
      )
    },
    {
      title: '付款方式',
      dataIndex: 'orderpayments',
      key: 'orderpayments',
      render: (orderpayments) => (
        <span>{orderpayments[0].method}</span>
      )
    },
    {
      title: '總金額',
      dataIndex: 'total',
      key: 'total',
>>>>>>> origin/main
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
<<<<<<< HEAD
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
        <Container fluid className="mt-5 pt-5">
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
=======
    },
    {
      title: '評論',
      key: 'common',
      render: (order) => (
        <Button onClick={() => handleReviewClick(order)}>撰寫</Button>
      )
    },
  ];
  const { TabPane } = Tabs;
  const filterOrdersByStatus = (orders, status) =>{
    return orders.filter((order) => order.status === status);
  }

  useEffect(()=>{
    getOrder()
  },[])

  return (
    <>
    <KanBan/>
    <div className='userOrder'>
    <Container fulid>
      <h1>我的訂單</h1>
      <div className='order-div'>
            {dataSource && dataSource !== '會員未建立任何訂單紀錄'?
              <div className='order-div'>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="未接單" key="1">
                    <Table dataSource={filterOrdersByStatus(dataSource, '未接單')} columns={columns} />
                  </TabPane>
                  <TabPane tab="已接單" key="2">
                    <Table dataSource={filterOrdersByStatus(dataSource, '已接單')} columns={columns} />
                  </TabPane>
                  <TabPane tab="未取餐" key="3">
                    <Table dataSource={filterOrdersByStatus(dataSource, '未取餐')} columns={columns} />
                  </TabPane>
                  <TabPane tab="已完成" key="4">
                    <Table dataSource={filterOrdersByStatus(dataSource, '已完成')} columns={columns} />
                  </TabPane>
                  <TabPane tab="已取消" key="5">
                    <Table dataSource={filterOrdersByStatus(dataSource, '已取消')} columns={columns} />
                  </TabPane>
                </Tabs>
              </div>
            :
            <Card>
              <Card.Body>
                  <Card.Title>目前無任何歷史訂單</Card.Title>
              </Card.Body>
            </Card>
            }
        </div>
    </Container>
    <ReviewModal
      visible={isReviewModalVisible}
      onOk={handleReviewSubmit}
      onCancel={handleReviewCancel}
      onRateChange={(value) => setReviewRating(value)}
      onCommentChange={(e) => setReviewComment(e.target.value)}
      orderId={dataSource && dataSource[0]?.oid}
    />
    </div>
    </>
  )
}

export default UserOrder
>>>>>>> origin/main
