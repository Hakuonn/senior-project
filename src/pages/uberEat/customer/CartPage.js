import React, { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import KanBan from 'components/KanBan';
import CartCounter from 'components/cart/CartCounter';
import CartDelete from 'components/cart/CartDelete';
import Axios from 'components/Axios';
import { Link } from 'react-router-dom';

/**
 * 購物車
 */
function Cart() {

  const [itemQuantities, setItemQuantities] = useState({});
  const [total, setTotal] = useState(null);
  const [cartid, setCartid] = useState([]); // Array 來存儲選定商品的 cart_id
  const [dataSource, setDataSource] = useState(null);
  console.log('total',total)
  console.log('itemQuantities',itemQuantities)

  const buyClick = () => {
    // 在按下"購買"時，將所選商品的 cart_id 傳送到後端
    Axios().post('/cart/getid/', JSON.stringify({ cartIds: cartid }))
      .then((res) => {
        if (res.status === 200) {
          let data = res.data
          setDataSource(data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getToBack = () => {
    Axios().get('order/cart/get/')
      .then((res) => {
        if (res.status === 200) {
          let data = res.data
          setDataSource(data)
          // 在資料已載入後計算總金額
          let caltotal = 0;
          data.forEach((item) => {
            caltotal += item.subtotal;
          });
          setTotal(caltotal);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // 找出目前商品的價格
  const item = dataSource.find(item => item.cart_id === itemId);
  const itemPrice = item ? item.price : 0;

  // 計算小計
  const subtotal = newQuantity * itemPrice;

  // 更新 itemQuantities
  setItemQuantities({ ...itemQuantities, [itemId]: newQuantity });

  // 更新 total
  setTotal(total => {
    // 找出原本的小計
    const prevSubtotal = (itemQuantities[itemId] || 0) * itemPrice;
    // 減去原本的小計，加上新的小計
    return total - prevSubtotal + subtotal;
  });
  }

  useEffect(() => {
    getToBack()
  }, [])

  


  return (
    <>
      <KanBan />
      <div className="cart">
        <Container fluid>
          <Form>
            <h1>購物車</h1>
            <Table dataSource={dataSource}>
              <Column title="店家" dataIndex="store_name" key="store_name" />
              <Column title="品名" dataIndex="goods_name" key="goods_name" />
              <Column title="單價" dataIndex="price" key="price" />
              <Column
                title="數量"
                key="quantity"
                render={(record) => (
                  <CartCounter
                    data={record}
                    cartid={record.cart_id}
                    onQuantityChange={handleQuantityChange}
                    onUpdateDataSource={setDataSource}
                  />
                )}
              />
              <Column
                title="小計"
                key="itemTotal"
                render={(record) => (
                  <span>{itemQuantities[record.cart_id] * record.price || record.price}</span>
                )}
              />
              <Column
                title="刪除"
                key="isDelete"
                render={(record) => (
                  <CartDelete cartid={record.cart_id} onUpdateDataSource={setDataSource} />
                )}
              />
            </Table>
            <div>
              <span className="cart-total">總金額：＄ {total}</span>
              <Link to="/checkout">
                <Button
                  variant="success"
                  size="lg"
                  className="cart-buy-button"
                  onClick={() => buyClick()}
                >
                  購買
                </Button>
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Cart;