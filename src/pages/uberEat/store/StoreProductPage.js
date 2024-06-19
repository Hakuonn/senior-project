import React, { useState, useEffect } from 'react';
import { Row, Spinner, Container, Col } from 'react-bootstrap';
import StoreMealEdit from './StoreMealEdit';
import Axios from '../../../components/Axios';
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import EmptyState from '../../../components/uberEat_C_S/EmptyState';
import ProductItem from '../../../components/uberEat_C_S/ProductItem';
import EmptyImg from '../../../imgs/ZHJ8C7j.png';

function StoreProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [itemData, setItemData] = useState(null);

  const goEditHandler = (item) => {
    setModalShow(true);
    setItemData(item);
  };

  const availableHandler = (gid) => {
    Axios().post('/store_data/goods/available/', JSON.stringify({ gid }))
    .then((res) => {
      console.log(res);
      alert('上架成功！');
      setStatus(false);
      window.location.reload();
    })
    .catch((err) => {
      console.log('failure');
    });
  };

  const unavailableHandler = (gid) => {
    Axios().post('/store_data/goods/unavailable/', JSON.stringify({ gid }))
    .then((res) => {
      console.log(res);
      alert('下架成功！');
      setStatus(true);
      window.location.reload();
    })
    .catch((err) => {
      console.log('failure');
    });
  };

  const deleteHandler = (gid) => {
    Axios().post('/store_data/goods/delete/', JSON.stringify({ gid }))
    .then((res) => {
      console.log(res);
      alert('刪除成功！');
      setData(data.filter(item => item.gid !== gid));
    })
    .catch((err) => {
      console.log('failure');
    });
  };

  const getBack = () => {
    Axios().get('/store_data/food/')
    .then((res) => {
      setData(res.data);
      if (data) {
        setStatus(data.status);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getBack();
  }, []);

  return (
    <>
      <StoreKanBan />
      <Container>
        <Row>
          <Col>
            <h1>商品管理</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
          <div className='store-product-div'>
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div>
                  {data && data.length ? (
                    <Row xs={1} md={4} className="g-4">
                      {data.map((item) => (
                        <ProductItem
                          key={item.gid}
                          item={item}
                          onEdit={goEditHandler}
                          onAvailable={availableHandler}
                          onUnavailable={unavailableHandler}
                          onDelete={deleteHandler}
                        />
                      ))}
                    </Row>
                  ) : (
                    <Row className="g-4">
                        <EmptyState src={EmptyImg} />
                    </Row>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
        {modalShow && (
          <StoreMealEdit
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={itemData}
          />
        )}
      </Container>
    </>
  );
}

export default StoreProductPage;
