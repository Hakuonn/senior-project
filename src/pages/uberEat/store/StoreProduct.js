import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Image, Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import StoreMealEdit from './StoreMealEdit';
import Axios from '../../components/Axios';
import StoreKanBan from '../../components/StoreKanBan';
import EmptyState from '../../components/menu/EmptyState';
import ProductItem from '../../components/ProductItem';

function StoreProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [serverUrl, setServerUrl] = useState(null);
  const { data: serverURL } = useFetch("http://localhost:8002/serverURL");
  const [modalShow, setModalShow] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [itemData, setItemData] = useState(null);

  const goEditHandler = (item) => {
    setModalShow(true);
    setItemData(item);
  }

  const availableHandler = (gid) => {
    Axios().post('/store_data/goods/available/', JSON.stringify({
      gid: gid,
    }))
    .then((res) => {
      console.log(res);
      alert('上架成功！');
      setStatus(false);
      window.location.reload()
    })
    .catch((err) => {
      console.log('failure');
    });
  }

  const unavailableHandler = (gid) => {
    Axios().post('/store_data/goods/unavailable/', JSON.stringify({
      gid: gid,
    }))
    .then((res) => {
      console.log(res);
      alert('下架成功！');
      setStatus(true);
      window.location.reload()
    })
    .catch((err) => {
      console.log('failure');
    });
  }

  const deleteHandler = (gid) => {
    Axios().post('/store_data/goods/delete/', JSON.stringify({
      gid: gid,
    }))
    .then((res) => {
      console.log(res);
      alert('刪除成功！');
      setData(data.filter(item => item.gid !== gid));
    })
    .catch((err) => {
      console.log('failure');
    });
  }

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
      setIsLoading(false); //data加載完成
    })
  }

  useEffect(() => {
    if (serverURL && serverURL.length > 0) {
      const firstServerURL = serverURL[0].serverurl;
      setServerUrl(firstServerURL);
    }
  }, [serverURL]);

  useEffect(() => {
    setIsLoading(true);
    getBack();
  }, []);

  return(
    <>
      <StoreKanBan />
      <div className='storeIndex'>
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
                <Container fulid>
                  {isLoading ?
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  :
                    <Row xs={1} md={4} className="g-4">
                      {data && data.length ? data.map((item) => (
                        <ProductItem
                          key={item.gid}
                          item={item}
                          onEdit={goEditHandler}
                          onAvailable={availableHandler}
                          onUnavailable={unavailableHandler}
                          onDelete={deleteHandler}
                        />
                      )) : (
                        <EmptyState src={'https://i.imgur.com/ZHJ8C7j.png'} />
                      )}
                      <StoreMealEdit show={modalShow} onHide={() => setModalShow(false)} data={itemData} />
                    </Row>
                  }
                  
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default StoreProduct;
