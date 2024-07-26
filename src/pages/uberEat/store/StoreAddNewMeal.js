import React, { useState } from 'react'
import StoreKanBan from '../../components/StoreKanBan'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import useFetch from '../../hooks/useFetch'
import * as formik from 'formik';
import * as yup from 'yup';
import Axios from '../../components/Axios';


/*** 
 * 商家新增產品頁面
 ***/
function StoreAddNewMeal() {
  const {data: allergen} = useFetch("http://localhost:8002/foodAllergen")
  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required("此項目為必填"),
    type: yup.string().required("此項目為必填"),
    intro: yup.string().required("此項目為必填"),
    quantity: yup.string().required("此項目為必填"),
    price: yup.string().required("此項目為必填"),
    ingredient: yup.string().required("此項目為必填"),
  });
  const [image,setImage] = useState(null)
  const datatoback = (values) => {
    Axios().post('/store_data/goods/upload/',JSON.stringify(
        {
            status: false,
            type: values.type,
            name: values.name,
            intro: values.intro,
            quantity: values.quantity,
            food_pic: image,
            price: values.price,
            ingredient: values.ingredient,
            allergen: values.allergen
        }
    ))
    .then((res)=>{
        console.log(res.data)
        alert('餐點已上傳，記得去商品管理頁面進行上架喔～')
        window.location.reload()
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const handlePicUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = function () {
      setImage(reader.result)
    };
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
    <StoreKanBan/>
    <div className='store-add-new-product'>
    <Container fluid>
        <h1>新增產品</h1>
        <Row>
            <Col>
            <Formik
            //  validationSchema={schema}
             initialValues={{
                name: '',
                type: '',
                intro: '',
                quantity: '',
                price: '',
                allergen: [],
                ingredient: '',
             }}
             
             onSubmit={(values) => {
                datatoback(values)
             }}
             
            >
                {({ handleSubmit, handleChange, values, touched, errors })=>(
                <Form noValidate onSubmit={handleSubmit} encType='multipart/form-data' >
                    <Form.Group className='mt-3'>
                        <Form.Label>產品名*：</Form.Label>
                        <Form.Control
                        name='name'
                        placeholder='產品名'
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>產品價格*：</Form.Label>
                        <Form.Control 
                        type='number'
                        name='price'
                        placeholder='輸入產品價格'
                        value={values.price}
                        onChange={handleChange}
                        isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="form-food-type" className="mt-3">
                        <Form.Label>選擇您的產品類型*</Form.Label>
                        <Form.Select aria-label="Default select example"
                         name='type'
                         value={values.type}
                         onChange={handleChange}
                         isInvalid={!!errors.type}
                        >
                            <option value="">選擇產品類型</option>
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
                    <Form.Group className='mt-3'>
                        <Form.Label>輸入產品原料*：</Form.Label>
                        <Form.Control 
                        name='ingredient'
                        placeholder="輸入原料，請用'、'分隔。ex:麵粉、燕麥、......"
                        value={values.ingredient}
                        onChange={handleChange}
                        isInvalid={!!errors.ingredient}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.ingredient}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>選擇產品數量*</Form.Label>
                        <Form.Select aria-label="Default select example"
                            name='quantity'
                            value={values.quantity}
                            onChange={handleChange}
                            isInvalid={!!errors.quantity}
                        >
                            <option>選擇剩食數量(至多10份)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.quantity}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>輸入產品簡介*：</Form.Label>
                        <Form.Control 
                         as="textarea" 
                         placeholder='填寫產品簡介'
                         name='intro'
                         value={values.intro}
                         isInvalid={!!errors.intro}
                         onChange={handleChange}
                         />
                        <Form.Control.Feedback type="invalid">
                            {errors.intro}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mt-3">
                        <Form.Label>放入您的產品實照*</Form.Label>
                        <Form.Control 
                         type="file" 
                         name='food_pic'
                         accept='image/*'
                         onChange={handlePicUpload}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>過敏原（選填）</Form.Label>
                        <div key='allergen'>
                            {allergen &&
                            allergen.map((item)=>(
                                <Form.Check
                                    type="switch"
                                    id={item.id}
                                    label={item.label}
                                    value={item.id}
                                    name='allergen'
                                    onChange={handleChange}
                                />
                            ))
                            }
                        </div>
                    </Form.Group>
                    <div className="d-grid gap-2 mt-5">
                        <Button variant="outline-success" size="lg" type="submit">
                            新增產品
                        </Button>
                    </div>
                </Form>
                )}
            </Formik>
            </Col>
        </Row>
    </Container>
    </div>
    </>
  )
}

export default StoreAddNewMeal