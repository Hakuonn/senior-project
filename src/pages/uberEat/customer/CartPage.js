import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import KanBan from '../../../components/nav_and_footer/KanBan';
import Axios from '../../../components/Axios';


/**
 * 購物車
 */
const ShoppingCart = () => {
  let navigate = useNavigate()

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    Axios().get('order/cart/get/')
      .then((res) => {
        if (res.status === 200) {
          const data = res.data || []; // 确保数据为数组
          setCartItems(data);

          // 计算总金额
          const caltotal = data.reduce((acc, item) => acc + item.subtotal, 0);
          setTotal(caltotal);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // 无论成功或失败，都设置为已加载
      });
  }, []);

  const updateQuantitytoBack = (goods_id,quantity) => {
    Axios().post('order/cart/update-quantity/',{
      "goods_id": goods_id,
      "quantity": quantity
    })
    .catch((err) => {
      alert("商品數量變更失敗！")
    })
  }
  
  /**
   * 將後端給予的資料以商店名稱進行分組
   */
  const groupedItems = cartItems.reduce((acc, item) => {
    const storeName = item.goods_info.store_name;
    if (!acc[storeName]) {
      acc[storeName] = [];
    }
    acc[storeName].push(item);
    return acc;
  }, {});

  /**
   * 處理購物車前端項目
   * @param {*} id 購物車項目ＩＤ
   */
  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  /**
   * 由於前面有店家名稱，這針對店家名稱進行全選
   * @param {*} storeName 店家名稱
   */
  const handleSelectAll = (storeName) => {
    const storeItems = groupedItems[storeName];
    const allSelected = storeItems.every(item => selectedItems.includes(item.id));
    
    if (allSelected) {
      // 取消所選店鋪的商品
      setSelectedItems(prev => prev.filter(id => !storeItems.some(item => item.id === id)));
    } else {
      // 選擇該店所有商品
      const storeItemIds = storeItems.map(item => item.id);
      setSelectedItems(prev => [...prev, ...storeItemIds.filter(id => !prev.includes(id))]);
    }
  };

  /** 
   * 結帳事件處理
   * */ 
  const handleCheckout = () => {
      navigate("/Cart/Checkout",{
        state: { goods_id: selectedItems } 
      })
  };

  // 若還在拿取資料則加載
  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    ); 
  }

  return (
    <Container fluid className="mt-5 pt-5">
      <KanBan></KanBan>
      <h2 className="mb-4 text-left">購物車</h2>
      {Object.keys(groupedItems).map(storeName => (
        <Card className="mb-5 shadow-sm" key={storeName}>
          <Card.Header className="text-white text-left" style={{ backgroundColor: '#2E8B57' }}>
            <h3>{storeName}</h3>
          </Card.Header>
          <Card.Body>
            <Table bordered hover className="mb-4">
              <thead className="bg-light">
                <tr>
                  <th className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={groupedItems[storeName].every(item => selectedItems.includes(item.id))}
                      onChange={() => handleSelectAll(storeName)}
                    />
                  </th>
                  <th className="text-left">商品名稱</th>
                  <th className="text-center">單價</th>
                  <th className="text-center">數量</th>
                  <th className="text-center">小計</th>
                  <th className="text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {groupedItems[storeName].map(item => (
                  <tr key={item.id}>
                    <td className="text-center">
                      <Form.Check
                        type="checkbox"
                        value={item.id}
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="text-left">{item.goods_info.product_name}</td>
                    <td className="text-center">${item.goods_info.price}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </td>
                    <td className="text-center">${item.subtotal}</td>
                    <td className="text-center">
                      <Button variant="danger" size="lg" onClick={() => removeItem(item.id)}>
                        刪除
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 4 }} className="text-center">
          <h4>總金額: ${total}</h4>
          <Button
            variant="success"
            size="lg"
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            結帳
          </Button>
        </Col>
      </Row>
    </Container>
  );
  /**
   * 處理購物車ＩＤ的商品選項處理
   * @param {*} id 
   * @param {*} delta 
   */
  function updateQuantity(id, delta) {
    setCartItems(prevItems =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          if (newQuantity > 0) {
            acc.push({
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.goods_info.price,
            });
            updateQuantitytoBack(item.goods,newQuantity)
          }
          else{
            removeItem(item.id)
          }
        } else {
          acc.push(item);
          
        }
        return acc;
      }, [])
    );

    const item = cartItems.find(item => item.id === id);
    const newTotal = total + item.goods_info.price * delta;
    setTotal(newTotal > 0 ? newTotal : 0);
  }
  /**
   * 刪除購物車選項
   * @param {*} id 購物車項目ＩＤ
   */
  function removeItem(id) {
    const itemToRemove = cartItems.find(item => item.id === id);
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    setTotal(prevTotal => prevTotal - itemToRemove.subtotal);

    Axios().delete(`order/cart/delete/`,{
      params:{goods_id:itemToRemove.goods}}
    )
    .then((res) => {
      alert("已移除購物車！")
    })
    .catch((err) => {
      alert("伺服器維護中")
    })
  };
}

export default ShoppingCart;