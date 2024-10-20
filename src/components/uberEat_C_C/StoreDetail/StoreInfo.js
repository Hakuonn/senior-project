import { useEffect, useState } from "react"
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
<<<<<<< HEAD
import Axios from "../../Axios"
=======
import Axios from "components/Axios"
>>>>>>> origin/main
import { Link, useLocation } from "react-router-dom";
import { Rating } from '@mui/material'

// icons
import { FaInstagram, FaSquareFacebook } from "react-icons/fa6"


function StoreInfo({id , baseUrl}){
    // 店家資訊
    const [storeInfo,setStoreInfo] = useState(null)
    // 店家評分
    const [rating,setRating] = useState(5)

    useEffect(()=>{
        const action = 'store/search/id/'
        Axios().get(action, {
            params:{'id':id}
        })
        .then((res)=>{
<<<<<<< HEAD
            console.log(res.data) // 確認取得的資料
            setStoreInfo(res.data)
=======
            setStoreInfo(res.data)
            console.log(storeInfo)
>>>>>>> origin/main
        })
        .catch((err)=>{
            alert("伺服器維護中，請稍後再進行使用")
        })
<<<<<<< HEAD
    }, [id])  // 依賴 id 確保每次 id 改變時重新執行
=======
    },[])
>>>>>>> origin/main

    return(
        <> 
            {
<<<<<<< HEAD
    storeInfo === null ? 
    <p>載入中！</p> 
    : 
    (
        <Row key={storeInfo.id}>
            <Col>
                <Image rounded fluid
                    src={baseUrl + storeInfo.pic}
                    alt={storeInfo.name}
                    className='store-img' />
            </Col>
            <Col>
                <h1>{storeInfo.name}</h1>
                <Container>
                    {rating &&
                        <Rating name="read-only" value={rating} readOnly size='large' />
                    }
                </Container>
                <Container>
                    {storeInfo.link_fb && 
                        <Link to={storeInfo.link_fb} className='store-link'><FaSquareFacebook size={30} /></Link>
                    }
                    {storeInfo.link_ig && 
                        <Link to={storeInfo.link_ig} className='store-link'><FaInstagram size={30} /></Link>
                    }
                </Container>
                <Container>
                    <h5>簡介</h5>
                    <p>{storeInfo.intro}</p>
                </Container>
            </Col>
        </Row>
    )
}
=======
                storeInfo === null ?
                <p>載入中！</p>
                :               
                <Row key={storeInfo.id}>
                <Col>
                    <Image rounded fulid 
                    src={baseUrl+storeInfo.pic}
                    alt={storeInfo.name}
                    className='store-img'     />
                </Col>
                <Col>
                    <h1>{storeInfo.name}</h1>
                    <Container>
                        {rating &&
                            <Rating name="read-only" value={rating['rating']} readOnly size='large'/>
                        }
                        
                    </Container>
                    <Container>
                        <Link to={storeInfo.link_fb} className='store-link'><FaSquareFacebook size={30}/></Link>
                        <Link to={storeInfo.link_ig} className='store-link'><FaInstagram size={30}/></Link>
                    </Container>
                    <Container>
                        <p></p>
                        <h5>簡介</h5>
                        <p>{storeInfo.intro}</p>
                    </Container>
                </Col>
            </Row>
            }
>>>>>>> origin/main
                

        </>
    )
}

export default StoreInfo