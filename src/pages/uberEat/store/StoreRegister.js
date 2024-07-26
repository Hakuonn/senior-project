import React, { useState } from 'react'
import { Card, Col, Container, Form, Row, Button, Image } from 'react-bootstrap'
import logo from '../../img/logo.png'
import StoreKanBan from '../../components/StoreKanBan'
import * as formik from 'formik';
import * as yup from 'yup';
import Axios from '../../components/Axios'

function StoreRegister() {
    const [image,setImage] = useState(null)
    const { Formik } = formik
    const schema = yup.object().shape({
        name: yup.string().required("此欄位為必填"),
        type: yup.string().required("此欄位為必填"),
        phone: yup.string().required("此欄位為必填"),
        address: yup.string().required("此欄位為必填"),
        email: yup.string().email(),
      });

      const handleFileChange = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = function () {
          setImage(reader.result)
        };
        if (file) {
          reader.readAsDataURL(file)
        }
      };

    const dataToBack = (values) =>{

            const action = '/store_data/register/'
            Axios().post(action, JSON.stringify({
                name: values.name,
                type: values.type,
                phone: values.phone,
                address: values.address,
                email: values.email,
                pic: image,
            }))
            .then((res)=>{
                if(res.status === 200){
                    alert('註冊成功')
                    window.location.href('/StoreIndex')
                }
                else{
                    alert('註冊失敗，請重新註冊')
                    window.location.href('/StoreRegister')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    



  return (
    <>
    <StoreKanBan/>
    <Container fluid>
        <Card className='store-signIn-card'>
            <Row className='signIn-row'>
                <Col xs={12} sm={6} md={6}>
                    <h2>共同為地球盡一份心力！</h2>
                    <Formik
                     validationSchema={schema}
                     onSubmit={(values)=>dataToBack(values)}
                     initialValues={{
                         name: '',
                         type: '',
                         phone: '',
                         address: '',
                         email: '',
                     }}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors })=>(
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="SignInName">
                            <Form.Label>商家店名*</Form.Label>
                            <Form.Control 
                             name='name' 
                             type="name" 
                             placeholder="輸入店名"
                             values={values.name}
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
                             values={values.type}
                             onChange={handleChange}
                             isValid={touched.type && !errors.type}
                            >
                                <option>選擇商家類型</option>
                                <option value="速食">速食</option>
                                <option value="日式">日式</option>
                                <option value="美式">美式</option>
                                <option value="中式">中式</option>
                                <option value="台式">台式</option>
                                <option value="素食">速食</option>
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
                             type="phone" 
                             placeholder="輸入商家電話" 
                             values={values.phone}
                             onChange={handleChange}
                             isValid={touched.phone && !errors.phone}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>地址*</Form.Label>
                            <Form.Control 
                             name='address' 
                             type="address" 
                             placeholder="ex:台北市信義區市府路45號" 
                             values={values.address}
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
                             values={values.email}
                             onChange={handleChange}
                             isValid={touched.email && !errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>放入您的商家實照(選填)</Form.Label>
                            <Form.Control 
                             type="file" 
                             name='pic'
                             onChange={handleFileChange}
                             accept=".jpg, .jpeg, .png"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.pic}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            提交
                        </Button>
                    </Form>
                    )}
                    </Formik>
                    {/* <div className='signIn-back-login'>
                        已經註冊了？返回登入頁面吧！ 
                        <Link to="/StoreLoginPage">
                            <Button variant="outline-dark" type="submit" className='sign-up'>
                                登入
                            </Button>
                        </Link>
                    </div> */}
                </Col>
                <Col xs={12} sm={6} md={6}>
                    <Image src={logo} rounded className='register-img'/>
                </Col>
            </Row>
        </Card>
    </Container>
    </>
  )
}

export default StoreRegister