import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Rating } from '@mui/material';
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import Axios from '../../../components/Axios';
import '../../../css/uberEat_store.css'


function StoreIndexPage() {
  const [pic, setPic] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [link_fb, setLink_fb] = useState('');
  const [link_ig, setLink_ig] = useState('');
  const [intro, setIntro] = useState('');
  const [on_business, setOn_business] = useState(false);
  const [rating, setRating] = useState(0);
  const [storePicInLeft, setStorePicInLeft] = useState('');

  // 處理圖片上傳
  const handlePicUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setPic(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 提交更改
  const submitHandler = () => {
    Axios().put('store/info/update_info/', {
      name,
      phone,
      email,
      intro,
      address,
      pic,
      link_fb,
      link_ig,
      on_business,
    })
    .then((res) => {
      console.log(res);
      alert('儲存成功');
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // 從後端獲取數據
  const getToBack = (id) => {
    Axios().get('store/info/get/')
    .then((res) => {
      if (res.status === 200) {
        const data = res.data;
        setName(data.name);
        setType(data.type);
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
        setLink_fb(data.link_fb);
        setLink_ig(data.link_ig);
        setIntro(data.intro);
        setOn_business(data.on_business);
        setStorePicInLeft(data.pic);

        Axios().get(`comment/store/rating/?id=${data.id}`)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            setRating(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
    })
    .catch((err) => {
      console.log(err);
    });

  };

  useEffect(() => {
    getToBack();
  }, []);

  return (
    <>
      <StoreKanBan/>
      <Container className='store-add-new-product'>
        <Row>
          <Col xs={12} sm={6} lg={8}>
            <Image src={storePicInLeft} alt={name} rounded className='storeImg' /> 
          </Col>

          <Col xs={12} sm={6} lg={8}>
            <h1>{name}</h1>
            <Rating name="read-only" value={rating || 0} readOnly size='large' />
            <p>類型：{type}</p>
            <p>電話：{phone}</p>
            <p>Email：{email}</p>
            <p>地址：{address}</p>

            <Form>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>商店名稱：</Form.Label>
                <Form.Control 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>電話：</Form.Label>
                <Form.Control 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email：</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label>地址：</Form.Label>
                <Form.Control 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formIntro" className="mb-3">
                <Form.Label>商店簡介：</Form.Label>
                <Form.Control 
                  as="textarea" 
                  value={intro} 
                  onChange={(e) => setIntro(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>放入您的商家實照：</Form.Label>
                <Form.Control 
                  type="file" 
                  name='food_pic'
                  accept='image/*'
                  onChange={handlePicUpload}
                />
              </Form.Group>

              <Form.Group controlId="formFB" className="mb-3">
                <Form.Label>FaceBook：</Form.Label>
                <Form.Control 
                  type="url" 
                  placeholder='輸入您的fb網址' 
                  value={link_fb} 
                  onChange={(e) => setLink_fb(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formIG" className="mb-3">
                <Form.Label>Instagram：</Form.Label>
                <Form.Control 
                  type="url" 
                  placeholder='輸入您的ig網址' 
                  value={link_ig} 
                  onChange={(e) => setLink_ig(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formBusinessStatus" className="mb-3">
                <Form.Label>營業狀態：</Form.Label>
                <Form.Check 
                  type="switch" 
                  id="custom-switch" 
                  label={on_business ? '營業中' : '休息中'}
                  checked={on_business}
                  onChange={(e) => setOn_business(e.target.checked)}
                />
              </Form.Group>

              <Button variant='success' type='button' className='storeIndexButton' onClick={submitHandler}>儲存</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StoreIndexPage;
