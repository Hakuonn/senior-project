import React, { useEffect, useState } from 'react'
import { Button, Container, Card } from 'react-bootstrap'
import { Table, Tabs } from 'antd';
import KanBan from '../../components/KanBan'
import Axios from '../../components/Axios';
import ReviewModal from '../../components/OrderReviewModal';

/**
 * 消費者訂單
 **/

function UserOrder() {
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
    Axios().get('/orderv/all/')
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
      dataIndex: 'oid',
      key: 'oid',
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
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
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