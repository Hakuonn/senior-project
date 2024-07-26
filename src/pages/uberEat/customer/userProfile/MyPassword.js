import React from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import Axios from '../../../components/Axios';

function MyPassword() {
    const { Formik } = formik
    const schema = yup.object({
        passwd: yup.string().required("欄位不得為空"),
        newPasswd: yup.string().min(8,"長度不得小於8碼").required("欄位不得為空"),
        confirmNewPasswd: yup.string().oneOf([yup.ref("newPasswd")], "密碼匹配不一致"),
    });

    const dataToBack = (values) =>{
        const action = 'memberP/password_upd/'
        Axios().post(action, JSON.stringify({
            old_password: values.passwd,
            new_password: values.newPasswd,
        }))
        .then((res)=>{
            if(res.status === 200){
                alert('密碼修改成功')
            }
            else{
                alert('密碼錯誤')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


  return (
    <Container fluid className='myprofile'>
        <Row>
            <Col xs={1} md={1}>
                {/* <Image src={logo} alt={logo} roundedCircle className='profile-img'/> */}
            </Col>
            <Col xs={8} md={8}>
                <h2>密碼設置</h2>
                <Formik
                 validationSchema={schema}
                 onSubmit={(values) => {
                    // console.log(values)
                    dataToBack(values)
                  }}
                  initialValues={{
                    passwd: '',
                    newPasswd: '',
                    confirmNewPasswd: '',
                  }}
                >
                {({handleSubmit, handleChange, values, touched, errors})=>(
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>原密碼</Form.Label>
                            <Form.Control 
                             type="text" 
                             name= 'passwd'
                             value={values.passwd}
                             onChange={handleChange}
                             isInvalid={!!errors.passwd}
                             required
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.passwd}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>新密碼</Form.Label>
                            <Form.Control 
                             type="password" 
                             name='newPasswd'
                             placeholder='需8位數' 
                             value={values.newPasswd}
                             onChange={handleChange}
                             isInvalid={!!errors.newPasswd}
                             required
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.newPasswd}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>再輸入一次新密碼</Form.Label>
                            <Form.Control 
                             type="password" 
                             name='confirmNewPasswd' 
                             placeholder='請再輸入一次新密碼' 
                             value={values.confirmNewPasswd}
                             onChange={handleChange}
                             isInvalid={!!errors.confirmNewPasswd}
                             required
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors.confirmNewPasswd}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            設置
                        </Button>
                    </Form>
                )}
                </Formik>
            </Col>
        </Row>
    </Container>
  )
}

export default MyPassword