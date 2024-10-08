import React, { useState } from 'react'
import { Card, Col, Container, Form, Row, Button, Image, Alert } from 'react-bootstrap'
import logo from 'imgs/logo.png'
import { Link } from 'react-router-dom'
import KanBan from 'components/nav_and_footer/KanBan'
import Axios from 'components/Axios'
import * as formik from 'formik';
import * as yup from 'yup';

/*** 
 * 註冊頁面 css還沒修正
 ***/
function RegisterPage() {
    const [selectAllergen, setSelectAllergen] = useState([])
    const { Formik } = formik
    const schema = yup.object({
        userName: yup.string().required("欄位不得為空"),
        phone: yup.string().min(10,"手機號碼應為10碼").max(10,"手機號碼應為10碼").required("欄位不得為空"),
        gender: yup.bool().required("必須選擇一個"),
        addr: yup.string().required("欄位不得為空"),
        account: yup.string().required("欄位不得為空"),
        email: yup.string().email("電子郵件的格式有誤").required("欄位不得為空"),
        birth: yup.date().required("該欄位為必填"),
        passwd: yup.string().min(8,"長度不得小於8碼").required("欄位不得為空"),
        confirmPasswd: yup.string().oneOf([yup.ref("passwd")], "密碼匹配不一致"),
    });

    const allergen = [
        { id: "eggs", label: "蛋" },
        { id: "milk", label: "奶" },
        { id: "gluten", label: "麩質" },
        { id: "Glycine-max", label: "大豆" },
        { id: "peanut", label: "花生" },
        { id: "almond", label: "杏仁" },
        { id: "crustaceans", label: "甲殼類" },
        { id: "fish", label: "魚" },
        { id: "mango", label: "芒果" },
        { id: "sesame", label: "芝麻" },
        { id: "pecan", label: "胡桃" },
        { id: "walnut", label: "核桃" },
        { id: "cashew", label: "腰果" },
        { id: "hazelnut", label: "榛果" },
        { id: "SO2", label: "二氧化硫（亞硫酸鹽）" }
    ];

    const [changepage, setChangePage] = useState(false)
    const [switchState, setSwitchState] = useState(false)
    
    function datatoback({values={}}){
        let data = {
            account: values.account,
            name: values.userName,
            phone: values.phone,
            gender: values.gender,
            email: values.email,
            address: values.addr,
            birth: values.birth,
            password: values.passwd,
            allergen: selectAllergen.toString()
        }
        // 後端格式如下
        // {
        //     "name": "string",
        //     "phone": "string",
        //     "gender": "strin",
        //     "email": "user@example.com",
        //     "address": "string",
        //     "birth": "2024-08-21",
        //     "allergen": "string",
        //     "prefer": "string",
        //     "account": "string",
        //     "password": "string"
        //   }

        Axios().post('member/basic/register/', JSON.stringify(data))
        .then((res)=>{
            if(res.status === 201){
                alert("註冊成功，歡迎成為我們的會員！")
                AfterofRegisterClickHandler()
            }
        })
        .catch((error)=>{
            if (error.response) {
                // 伺服器有回應
                const status = error.response.status;
    
                switch (status) {
                    case 400:
                        alert("輸入的格式出錯")
                        break;
                    case 409:
                        alert("已經有相同帳號！請去登入～");
                        break;
                    case 500:
                        alert("伺服器出現錯誤，請稍候嘗試");
                        break;
                    default:
                        console.error(`Unexpected Error: ${status}`);
                }
            } else if (error.request) {
                // 請求已發出，但沒有收到回應
                console.error('No Response: 伺服器無回應');
            } else {
                // 設定錯誤
                console.error('Error:', error.message);
            }
        })
    }

    // 註冊後回到商店選擇頁面
    const AfterofRegisterClickHandler = () =>{
        alert("註冊成功")
        window.open("/LoginPage",'_self')
    }

    // 過敏原管理
    const handleAllergenChange=(e)=>{
        setSelectAllergen([e, ...selectAllergen])
        const newArr = selectAllergen.filter(function(ele, pos){
            return selectAllergen.indexOf(ele) === pos
        })
        console.log(newArr)
        setSwitchState(!switchState)         
     }

    // 換頁
    const clickHandler = () =>{
        setChangePage(true)
    }

    const allergyPage = ({handleSubmit, handleChange, values, touched, errors}) =>{
        return(
            <div className='allergy-div'>
                <h4>選擇您的過敏原：</h4>
                {allergen.map((item)=>(
                    <Form.Check
                        key={item.id}
                        type='switch'
                        id={item.id}
                        label={item.label}
                        value={item.id}
                        onChange={(e)=>handleAllergenChange(e.target.value)}
                    />
                ))}
                <Alert variant="dark">本食品過敏原所列出之來源來自：<br/>SGS可提供的過敏原檢測服務</Alert>
                <Button variant="outline-secondary" type="button" size='lg' className="me-3" onClick={()=>setChangePage(false)}>
                    回上頁
                </Button>
                <Button variant="outline-success" type="button" onClick={(e)=>(datatoback({values}))} size='lg'>
                    提交
                </Button>
            </div>
        )
    }

    const basicInfoPage = ({handleSubmit, handleChange, values, touched, errors}) =>{
        return(
            <div>
                <Form.Group className="mb-3" controlId="UserName">
                    <Form.Label>名字*</Form.Label>
                    <Form.Control 
                     type="text" 
                     name='userName' 
                     placeholder="你的名字" 
                     value={values.userName} 
                     onChange={handleChange}
                     isInvalid={!!errors.userName}
                     required
                     />
                     <Form.Control.Feedback type='invalid'>
                        {errors.userName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>電話*</Form.Label>
                    <Form.Control 
                     type="text" 
                     placeholder="輸入電話" 
                     name='phone' 
                     value={values.phone} 
                     onChange={handleChange}
                     isInvalid={!!errors.phone}
                     required
                     />
                     <Form.Control.Feedback type='invalid'>
                        {errors.phone}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender" name='gender'>
                    <Form.Label>性別*</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="男"
                            name="gender"
                            type="radio"
                            value="male"
                            onChange={handleChange}
                            id={1}
                        />
                        <Form.Check
                            inline
                            label="女"
                            name="gender"
                            type="radio"
                            value="female"
                            onChange={handleChange}
                            id={0}
                        />
                        <Form.Check
                            inline
                            label="不願透露"
                            name="gender"
                            type="radio"
                            value="unknown-gender"
                            onChange={handleChange}
                            id={3}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>住址*</Form.Label>
                    <Form.Control 
                     type="text" 
                     placeholder="輸入地址" 
                     name='addr' 
                     value={values.addr} 
                     onChange={handleChange}
                     isInvalid={!!errors.addr}
                     required 
                     />
                    <Form.Control.Feedback type='invalid'>
                        {errors.addr}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="account">
                    <Form.Label>帳號*</Form.Label>
                    <Form.Control 
                     type="text" 
                     placeholder="輸入帳號(在此平台登入的帳號)" 
                     name='account' 
                     value={values.account} 
                     onChange={handleChange}
                     isInvalid={!!errors.account}
                     required
                     />
                    <Form.Control.Feedback type='invalid'>
                        {errors.account}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control 
                     type="email" 
                     placeholder="輸入您的email" 
                     name='email' 
                     value={values.email} 
                     onChange={handleChange}
                     isInvalid={!!errors.email}
                     required
                     />
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="birthday">
                    <Form.Label>生日*</Form.Label>
                    <Form.Control 
                     type="date" 
                     value={values.birth} 
                     name='birth' 
                     onChange={handleChange}
                     isInvalid={!!errors.birth}
                     required
                     />
                    <Form.Control.Feedback type='invalid'>
                        {errors.birth}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="SignInPassword">
                    <Form.Label>密碼*</Form.Label>
                    <Form.Control 
                     type="password" 
                     placeholder="Password" 
                     name='passwd' 
                     value={values.passwd} 
                     onChange={handleChange}
                     isInvalid={!!errors.passwd}
                     required
                     />
                    <Form.Control.Feedback type='invalid'>
                        {errors.passwd}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="SignInCheckPassword">
                    <Form.Label>再輸入一次密碼*</Form.Label>
                    <Form.Control 
                     type="password" 
                     placeholder="再輸入一次密碼" 
                     name='confirmPasswd'
                     value={values.confirmPasswd} 
                     onChange={handleChange}
                     isInvalid={!!errors.confirmPasswd}
                     required
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.confirmPasswd}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-success" type="button" onClick={clickHandler}>
                    下一步
                </Button>
            </div>
        )
    }

    return (
        <>
        <KanBan/>
        <Container fluid>
            <Card className='signIn-card'>
                <Row className='signIn-row'>
                    <Col xs={12} sm={6} md={6}>
                        <h2>一起加入環飽行列！</h2>
                        <Formik
                         validationSchema={schema}
                         onSubmit={console.log}
                         initialValues={{
                            userName: '',
                            phone: '',
                            gender: '',
                            addr: '',
                            account: '',
                            email: '',
                            passwd: '',
                            confirmPasswd: '',
                         }}
                        >
                            {({handleSubmit, handleChange, values, touched, errors})=>(
                            <Form onSubmit={handleSubmit}>
                                {changepage ? allergyPage({handleSubmit, handleChange, values, touched, errors}) :  basicInfoPage({handleSubmit, handleChange, values, touched, errors})}
                            </Form>
                            )}
                        </Formik>
                        <div className='signIn-back-login'>
                            已經註冊了？返回登入頁面吧！ 
                            <Link to="/LoginPage">
                                <Button variant="outline-dark" type="submit" className='sign-up'>
                                    登入
                                </Button>
                            </Link>
                        </div>
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

export default RegisterPage
