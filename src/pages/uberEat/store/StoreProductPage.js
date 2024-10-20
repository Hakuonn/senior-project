import React, { useState, useEffect } from 'react';
import { Row, Spinner, Container, Col } from 'react-bootstrap';
import StoreMealEdit from './StoreMealEdit';
import Axios from '../../../components/Axios';
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import EmptyState from '../../../components/uberEat_C_S/EmptyState';
import ProductItem from '../../../components/uberEat_C_S/ProductItem';
import EmptyImg from '../../../imgs/ZHJ8C7j.png';
import '../../../css/uberEat_store.css'


function StoreProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [itemData, setItemData] = useState(null);

  const goEditHandler = (item) => {
    setModalShow(true);
    setItemData(item);
  };

  const availableHandler = (id) => {
    Axios().patch(`goods/store/toggle_status/?id=${id}`)
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

  const unavailableHandler = (id) => {
    Axios().patch(`goods/store/toggle_status/?id=${id}`)
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

  const deleteHandler = (id) => {
    Axios().delete(`goods/store/delete/?id=${id}`)
    .then((res) => {
      console.log(res);
      alert('刪除成功！');
      setData(data.filter(item => item.id !== id));
    })
    .catch((err) => {
      console.log('failure');
    });
  };
  
  

  const getBack = () => {
    Axios().get('/goods/store/get/')
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

  const handleSave = () => {
    alert('已成功修改');
    setModalShow(false);
    window.location.reload();
  };

  return (
    <>
      <StoreKanBan />
      <Container className='store-add-new-product'>
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
                          key={item.id}
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
            onSave={handleSave}
            data={itemData}
          />
        )}
      </Container>
    </>
  );
}

export default StoreProductPage;
