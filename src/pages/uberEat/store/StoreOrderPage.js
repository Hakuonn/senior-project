import React, { useEffect, useState } from 'react';
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import { Card } from 'react-bootstrap';
import { Space, Button, Table } from 'antd';
import Axios from '../../../components/Axios';
import StoreCancelOrder from '../../../components/uberEat_C_S/StoreCancelOrder';

function StoreOrderPage({ baseUrl }) {
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
  const handleNotifyCustomer = (record) => {
    Axios()
      .post('/order/notice/', JSON.stringify({
        oid: record.oid,
      }))
      .then((response) => {
        console.log('通知顧客可取餐的回應:', response);
        // 更新訂單狀態為已完成
        const updatedDataSource = dataSource.map((item) => {
          if (item.oid === record.oid) {
            item.status = '未取餐';
          }
          return item;
        });
        setDataSource(updatedDataSource);
      })
      .catch((error) => {
        console.error('通知顧客可取餐失敗', error);
      });
  };

  const handleAcceptOrder = (record) => {
    let endpoint = '';
    if (record.status === '未接單') {
      endpoint = '/order/accept/';
    } else if (record.status === '已接單') {
      endpoint = '/order/notice/';
    } else if (record.status === '未取餐') {
      endpoint = '/order/complete/';
    }
    
    Axios()
      .post(endpoint, JSON.stringify({
        oid: record.oid,
      }))
      .then((response) => {
        console.log('Response from server:', response);
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
    const updatedDataSource = dataSource.filter((item) => item.oid !== orderId);
    setDataSource(updatedDataSource);
    setSelectedOrderId(null);
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
              onClick={() => handleNotifyCustomer(record)}
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
        <h1>待處理訂單</h1>
        <div className='order-div'>
          {dataSource ?
            <Table dataSource={dataSource} columns={columns} rowKey="oid" />
            :
            <Card>
              <Card.Body>
                <Card.Title>目前無任何訂單喔～</Card.Title>
              </Card.Body>
            </Card>
          }
        </div>
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

export default StoreOrderPage;