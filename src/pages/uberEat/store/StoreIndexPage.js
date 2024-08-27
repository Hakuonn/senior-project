import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Rating } from '@mui/material';
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import Axios from '../../../components/Axios';

function StoreIndexPage({ baseUrl }) {
  const [picFile, setPicFile] = useState(null); // 儲存上傳的檔案物件
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [link_fb, setLink_fb] = useState('');
  const [link_ig, setLink_ig] = useState('');
  const [intro, setIntro] = useState('');
  const [rating, setRating] = useState(0);
  const [storePicInLeft, setStorePicInLeft] = useState('');
  const [initialData, setInitialData] = useState({}); // 儲存初始資料
  const [isPicModified, setIsPicModified] = useState(false); // 追蹤是否有新照片上傳

  useEffect(() => {
    getStoreData();
  }, []);

  const getStoreData = () => {
    Axios().get('/store_data/get/')
      .then((res) => {
        if (res.status === 200) {
          const data = res.data[0];
          setName(data.name);
          setType(data.type);
          setPhone(data.phone);
          setEmail(data.email);
          setAddress(data.address);
          setLink_fb(data.link_fb);
          setLink_ig(data.link_ig);
          setIntro(data.intro);
          setStorePicInLeft(data.pic);

          // 設定初始資料
          setInitialData({
            name: data.name,
            type: data.type,
            phone: data.phone,
            email: data.email,
            address: data.address,
            link_fb: data.link_fb,
            link_ig: data.link_ig,
            intro: data.intro,
            pic: data.pic, // 可以使用圖片的 URL 或其他唯一識別符號
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching store data:', err);
      });

    Axios().get('/store_data/score')
      .then((res) => {
        if (res.status === 200) {
          setRating(res.data.rating);
        }
      })
      .catch((err) => {
        console.error('Error fetching rating:', err);
      });
  };

  const handlePicUpload = (event) => {
    const file = event.target.files[0];
    setPicFile(file);
    setIsPicModified(true); // 設置為 true 表示有新照片上傳
  };

  const submitHandler = () => {
    const formData = new FormData();

    // 判斷是否有新的圖片上傳並且商家確實要修改照片
    if (picFile && isPicModified) {
      formData.append('pic', picFile);
    }

    // 檢查其他資料是否有更改
    if (link_fb !== initialData.link_fb) {
      formData.append('link_fb', link_fb);
    }
    if (link_ig !== initialData.link_ig) {
      formData.append('link_ig', link_ig);
    }
    if (intro !== initialData.intro) {
      formData.append('intro', intro);
    }

    // 提交表單
    Axios().post('/store_data/change/', formData)
      .then((res) => {
        console.log('Change success:', res);
        alert('儲存成功');
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error submitting data:', err);
      });
  };

  return (
    <>
      <StoreKanBan />
      <Container style={{ marginBottom: '10vh' }}>
        <Row>
          <Col xs={12} sm={6} md={6}>
            <Image src={`${baseUrl}${storePicInLeft}`} alt={name} rounded className='storeImg' />
          </Col>

          <Col xs={12} sm={6} md={6}>
            <h1>{name}</h1>
            <Rating name="read-only" value={rating} readOnly size='large' />
            <p>類型：{type}</p>
            <p>電話：{phone}</p>
            <p>Email：{email}</p>
            <p>地址：{address}</p>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>放入您的商家實照</Form.Label>
                <Form.Control
                  type="file"
                  name='food_pic'
                  accept='image/*'
                  onChange={handlePicUpload}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>FaceBook：</Form.Label>
                <Form.Control type='url' placeholder='輸入您的fb網址' value={link_fb} onChange={(e) => setLink_fb(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Instagram：</Form.Label>
                <Form.Control type='url' placeholder='輸入您的ig網址' value={link_ig} onChange={(e) => setLink_ig(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>商店簡介：</Form.Label>
                <Form.Control as="textarea" placeholder='輸入您的簡介' value={intro} onChange={(e) => setIntro(e.target.value)} />
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