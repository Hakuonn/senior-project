// StoreOrder.js
import React, { useEffect, useState } from 'react';
import StoreKanBan from '../../components/StoreKanBan';
import { Container, Card } from 'react-bootstrap';
import { Space, Button, Table } from 'antd';
import Axios from '../../components/Axios';
import StoreCancelOrder from '../../components/StoreCancelOrder';

function StoreOrder() {
  const [dataSource, setDataSource] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const getOrder = () => {
    Axios()
      .get('/orderv/all/')
      .then((res) => {
        let data = res.data;
        const filterData = data.filter(item => {
          const status = item.status;
          return status === '未接單' || status === '已接單' || status === '未取餐';
        });
        setDataSource(filterData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAcceptOrder = (record) => {
    Axios()
      .post('/order/accept/', JSON.stringify({
        oid: record.oid,
      }))
      .then((response) => {
        if (response.status === 200) {
          const updatedDataSource = dataSource.map((item) => {
            if (item.oid === record.oid) {
              if (item.status === '未接單') {
                item.status = '已接單';
              } else if (item.status === '已接單') {
                item.status = '未取餐';
              } else if (item.status === '未取餐') {
                item.status = '已完成';
                // 2秒後會自動在頁面刪除
                setTimeout(() => {
                  const updatedData = dataSource.filter((item) => item.oid !== record.oid);
                  setDataSource(updatedData);
                }, 2000);
              }
            }
            return item;
          });
          setDataSource(updatedDataSource);
        }
      })
      .catch((error) => {
        console.error("接單失敗", error);
      });
  };

  const handleCancelOrder = (record) => {
    setSelectedOrderId(record.oid);
  };

  const removeCancelledOrder = (orderId) => {
    const updatedDataSource = dataSource.map((item) => {
      if (item.oid === orderId && item.status === '未取餐') {
        setTimeout(() => {
          const updatedData = dataSource.filter((item) => item.oid !== orderId);
          setDataSource(updatedData);
        }, 2000);
      }
      return item;
    });
    setDataSource(updatedDataSource);
  };

  useEffect(() => {
    getOrder();
  }, []);

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
    {
      title: "操作",
      render: (record) => (
        <Space>
          {record.status === '未接單' && (
            <Button
              type="primary"
              ghost
              onClick={() => handleAcceptOrder(record)}
            >
              接單
            </Button>
          )}
          {record.status === '已接單' && (
            <Button
              type="primary"
              ghost
              onClick={() => handleAcceptOrder(record)}
            >
              通知顧客可取餐
            </Button>
          )}
          {record.status === '未取餐' && (
            <Button
              type="primary"
              ghost
              onClick={() => handleAcceptOrder(record)}
            >
              完成訂單
            </Button>
          )}
          <Button
            type="primary"
            danger
            ghost
            onClick={() => handleCancelOrder(record)}
          >
            取消
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <StoreKanBan />
      <div className='storeIndex'>
        <Container fulid>
          <h1>待處理訂單</h1>
          <div className='order-div'>
            {dataSource ?
             <Table dataSource={dataSource} columns={columns} />
             :
             <Card>
                <Card.Body>
                    <Card.Title>目前無任何訂單喔～</Card.Title>
                </Card.Body>
              </Card>
            }
          </div>
        </Container>
      </div>
      <StoreCancelOrder
        visible={!!selectedOrderId}
        onCancel={() => setSelectedOrderId(null)}
        orderId={selectedOrderId}
        onOrderCancelled={removeCancelledOrder}
      />
    </>
  );
}

export default StoreOrder;
