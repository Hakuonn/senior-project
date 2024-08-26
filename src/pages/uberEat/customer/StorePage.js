import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
import { FaInstagram, FaSquareFacebook } from "react-icons/fa6"
import { Link, useLocation , useParams } from "react-router-dom";
import { Divider, Space, Tag } from 'antd';
import Meal from 'components/uberEat_C_C/StoreDetail/Product';
import KanBan from 'components/nav_and_footer/KanBan';
import Axios from 'components/Axios';
import Comment from 'components/uberEat_C_C/StoreDetail/Comment';
import StoreInfo from 'components/uberEat_C_C/StoreDetail/StoreInfo';
;


function Store({baseUrl}) {

    const [serverUrl, setServerUrl] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    // 商店資訊
    const [storeInfo, setStoreInfo] = useState(null)
    const [rating, setRating] = useState(null)
    const [goods, setGoods] = useState(null)
    const [goodinfo, setGoodinfo] = useState(null)
    const [commit, setCommit] = useState(null)

    const foodAllergen = [
        {
            "id": "eggs",
            "label": "蛋"
        },
        {
            "id": "milk",
            "label": "奶"
        },
        {
            "id": "gluten",
            "label": "麩質"
        },
        {
            "id": "Glycine-max",
            "label": "大豆"
        },
        {
            "id": "peanut",
            "label": "花生"
        },
        {
            "id": "almond",
            "label": "杏仁"
        },
        {
            "id": "crustaceans",
            "label": "甲殼類"
        },
        {
            "id": "fish",
            "label": "魚"
        },
        {
            "id": "mango",
            "label": "芒果"
        },
        {
            "id": "sesame",
            "label": "芝麻"
        },
        {
            "id": "pecan",
            "label": "胡桃"
        },
        {
            "id": "walnut",
            "label": "核桃"
        },
        {
            "id": "cashew",
            "label": "腰果"
        },
        {
            "id": "hazelnut",
            "label": "榛果"
        },
        {
            "id": "SO2",
            "label": "二氧化硫（亞硫酸鹽）"
        }
    ]

    const {id} = useParams()
    const parts = id

    // 取得產品資料
    const getGoodsFromBack = () =>{
        const action = 'goods/search/store/'
        Axios().get(action, {params:{store_id:parts}})
        .then((res)=>{
            setGoods(res.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }



    // 點擊查看後會再將該商品資訊傳至Ｍeal
    const goodsInfoToMeal = (item) =>{
        setModalShow(true)
        setGoodinfo(item)
    }

    // 英文轉中文
    const translate = (allergenIds) =>{
        let a_new = allergenIds.replace(/\'/g,'"');
        let show = [] //過敏原的Array ; 
        let show_text = "" ; //過敏原呈現 邏輯：先將確定的過敏原用l包起來再回圈輸出
        a_new = JSON.parse(a_new)
        a_new.map(id =>{
            const allergen = foodAllergen.find(a => a.id === id);
            show.push(allergen['label'])
        });
        for (let i = 1 ; i < show.length ; i++){
            show_text += show[i] ;
            if (i !== show.length-1){
                show_text += '、'
            }
        }
        return show ? show_text : "無過敏原";
    }

    useEffect(()=>{
        getGoodsFromBack()
    },[])

  return (
    <>
    <KanBan/>
    <Container className='storedetail-page d-flex'>
    <div className='store'>
        <Container fluid>
            <StoreInfo id={parts} baseUrl={baseUrl} />
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className='mt-3 mb-5'>🍴本店餐點🍴</h2>
                    <Container fluid>
                        <Row xs={1} md={5} className="g-4">
                            {goods &&
                            goods.map((item)=>(
                                <Col key={item.gid}>
                                <Card className="food-card">

                                    <Card.Img variant="top" src={`${baseUrl}${item.food_pic}`} className='food-card-img'/>
                                    
                                    <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Subtitle>剩餘數量：{item.quantity}</Card.Subtitle>
                                    <Card.Text>
                                        <Space size={[0, 10]} wrap>
                                            <Tag color="red">{translate(item.allergen)}</Tag>
                                        </Space>
                                        <br/>
                                        ${item.price}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => {
                                        let tmp_item = item
                                        tmp_item['baseUrl']=baseUrl;
                                        return(
                                            
                                            goodsInfoToMeal(tmp_item)
        
                                        )
                                    }}>查看</Button>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))
                            }
                        </Row>
                        <Meal show={modalShow} goodinfo={goodinfo} onHide={() => setModalShow(false)}/>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>來自google評論</h2>
                    <p style={{fontSize: 30}}>功能尚未開放，敬請期待～～</p>
                </Col>
                <Col>
                    <h2>本平台評論</h2>
                    <Comment id={parts}/>     
                </Col>
            </Row>
        </Container>
    </div>

    </Container>
    </>
  )
}

export default Store