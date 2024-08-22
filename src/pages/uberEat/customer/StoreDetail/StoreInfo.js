import { useEffect, useState } from "react"
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
import Axios from "../../../../components/Axios"
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
            setStoreInfo(res.data)
            console.log(storeInfo)
        })
        .catch((err)=>{
            alert("伺服器維護中，請稍後再進行使用")
        })
    },[])

    return(
        <> 
            {
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
                        <p>{storeInfo.intro}</p>
                    </Container>
                </Col>
            </Row>
            }
                

        </>
    )
}

export default StoreInfo