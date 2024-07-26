import React, { useState, useEffect } from 'react'
import StoreKanBan from '../../components/StoreKanBan'
import { Container, Card } from 'react-bootstrap'
import { Table, Tabs } from 'antd';
import Axios from '../../components/Axios';


/*** 
 * 商家歷史訂單記錄頁面
 ***/
function StoreOrderHistory() {
  const [dataSource, setDataSource] = useState(null)
  console.log(dataSource)
  const getHistory = () => {
    Axios()
      .get('/orderv/all/')
      .then((res) => {
        let data = res.data;
        setDataSource(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'oid',
      key: 'oid',
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
      ),
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
      ),
    },
    {
      title: '付款方式',
      dataIndex: 'orderpayments',
      key: 'orderpayments',
      render: (orderpayments) => (
        <span>{orderpayments[0].method}</span>
      ),
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
  ];

  const { TabPane } = Tabs;
  const filterOrdersByStatus = (orders, status) =>{
    return orders.filter((order) => order.status === status);
  }

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
    <StoreKanBan/>
    <div className='storeIndex'>
      <Container fulid>
        <h1>歷史訂單</h1>
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
    </div>
    </>
  )
}

export default StoreOrderHistory