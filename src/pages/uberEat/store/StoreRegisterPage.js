import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Row, Button, Image, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // 使用 useNavigate 進行頁面跳轉
import logo from '../../../imgs/logo.png';
import StoreKanBan from '../../../components/nav_and_footer/StoreKanBan';
import * as formik from 'formik';
import * as yup from 'yup';
import Axios from '../../../components/Axios';
import '../../../css/uberEat_store.css'


function StoreRegister() {
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // 使用 useNavigate
    const { Formik } = formik;

    useEffect(() => {
        const checkStoreExist = async () => {
            try {
                const response = await Axios().get('/store/info/check/');
                console.log('API 回應:', response); // 輸出 API 回應
                if (response.status === 200) {
                    alert('您以已有賣家身分，直接幫您跳轉到商品頁面哦~');
                    navigate('/StoreProduct'); // 使用 navigate 進行頁面跳轉
                } else {
                    console.log('沒有商家身分');
                }
            } catch (error) {
                console.error('檢查商家是否存在失敗:', error);
            }
        };
        checkStoreExist();
    }, [navigate]);
    

    const schema = yup.object().shape({
        name: yup.string().required("此欄位為必填"),
        type: yup.string().required("此欄位為必填"),
        phone: yup.string().required("此欄位為必填"),
        address: yup.string().required("此欄位為必填"),
        email: yup.string().email(),
        intro: yup.string().optional(),
        link_fb: yup.string().optional(),
        link_ig: yup.string().optional(),
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const dataToBack = async (values) => {
        const action = 'store/register/';
        Axios().post(action, JSON.stringify({
            name: values.name,
            type: values.type,
            phone: values.phone,
            address: values.address,
            email: values.email,
            intro: values.intro,
            link_fb: values.link_fb,
            link_ig: values.link_ig,
            pic: image,
            on_business: true,
        }))
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                alert('註冊成功');
                navigate('/StoreProduct'); // 使用 navigate 進行頁面跳轉
            } else {
                alert('註冊失敗，請重新註冊');
                navigate('/StoreRegister'); // 使用 navigate 進行頁面跳轉
            }
        })
        .catch((err) => {
            console.log(err);
            alert('註冊失敗，請重新註冊');
            navigate('/StoreRegister'); // 使用 navigate 進行頁面跳轉
        });
    };

    return (
        <>
            <StoreKanBan />
            <Card className='store-signIn-card'>
                <Row className='signIn-row'>
                    <Col xs={12} sm={6} md={6}>
                        <h2>共同為地球盡一份心力！</h2>
                        <Formik
                            validationSchema={schema}
                            onSubmit={(values) => dataToBack(values)}
                            initialValues={{
                                name: '',
                                type: '',
                                phone: '',
                                address: '',
                                email: '',
                                intro: '',
                                link_fb: '',
                                link_ig: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="SignInName">
                                        <Form.Label>商家店名*</Form.Label>
                                        <Form.Control 
                                            name='name' 
                                            type="text" 
                                            placeholder="輸入店名"
                                            value={values.name}
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="type">
                                        <Form.Label>類型*</Form.Label>
                                        <Form.Select 
                                            name='type'
                                            value={values.type}
                                            onChange={handleChange}
                                            isValid={touched.type && !errors.type}
                                        >
                                            <option>選擇商家類型</option>
                                            <option value="速食">速食</option>
                                            <option value="日式">日式</option>
                                            <option value="美式">美式</option>
                                            <option value="中式">中式</option>
                                            <option value="台式">台式</option>
                                            <option value="素食">素食</option>
                                            <option value="手搖飲">手搖飲</option>
                                            <option value="炸物">炸物</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.type}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label>電話*</Form.Label>
                                        <Form.Control 
                                            name='phone' 
                                            type="text" 
                                            placeholder="輸入商家電話" 
                                            value={values.phone}
                                            onChange={handleChange}
                                            isValid={touched.phone && !errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Label>地址*</Form.Label>
                                        <Form.Control 
                                            name='address' 
                                            type="text" 
                                            placeholder="ex:台北市信義區市府路45號" 
                                            value={values.address}
                                            onChange={handleChange}
                                            isValid={touched.address && !errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="SignInEmail">
                                        <Form.Label>Email(選填)</Form.Label>
                                        <Form.Control 
                                            name='email' 
                                            type="email" 
                                            placeholder="輸入您的email" 
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={touched.email && !errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="intro">
                                        <Form.Label>店家簡介</Form.Label>
                                        <Form.Control 
                                            name='intro' 
                                            type="text" 
                                            placeholder="輸入店家簡介" 
                                            value={values.intro}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="link_fb">
                                        <Form.Label>社群連結_FB</Form.Label>
                                        <Form.Control 
                                            name='link_fb' 
                                            type="url" 
                                            placeholder="輸入Facebook社群連結" 
                                            value={values.link_fb}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="link_ig">
                                        <Form.Label>社群連結_IG</Form.Label>
                                        <Form.Control 
                                            name='link_ig' 
                                            type="url" 
                                            placeholder="輸入Instagram社群連結" 
                                            value={values.link_ig}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>放入您的商家實照(選填)</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            name='pic'
                                            onChange={handleFileChange}
                                            accept=".jpg, .jpeg, .png"
                                        />
                                    </Form.Group>
                                    <Button variant="success" type="submit">
                                        提交
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                    <Col xs={12} sm={6} md={6}>
                        <Image src={logo} rounded className='register-img'/>
                    </Col>
                </Row>
            </Card>

        </>
    );
}

export default StoreRegister;
