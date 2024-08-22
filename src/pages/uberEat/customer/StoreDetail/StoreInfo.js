import { useEffect, useState } from "react"
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
import Axios from "../../../../components/Axios"
import { Link, useLocation } from "react-router-dom";
// icons
import { FaInstagram, FaSquareFacebook } from "react-icons/fa6"


function StoreInfo({id}){
    const [storeInfo,setStoreInfo] = useState(null)

    useEffect(()=>{
        const action = 'store/search/id/'
        Axios().get(action, {
            params:{'id':id}
        })
        .then((res)=>{
            setStoreInfo(res.data)
        })
        .catch((err)=>{
            alert("伺服器維護中，請稍後再進行使用")
        })
    },[])

    return(
        <>
            {storeInfo &&
            storeInfo.map((item)=>(
                <Row key={item.id}>
                    <Col>
                        <Image rounded fulid src={`${serverUrl}${item.pic}`} alt={item.name} className='store-img'/>
                    </Col>
                    <Col>
                        <h1>{item.name}</h1>
                        <Container>
                            {rating &&
                                <Rating name="read-only" value={rating['rating']} readOnly size='large'/>
                            }
                            
                        </Container>
                        <Container>
                            <Link to={item.link_fb} className='store-link'><FaSquareFacebook size={30}/></Link>
                            <Link to={item.link_ig} className='store-link'><FaInstagram size={30}/></Link>
                        </Container>
                        <Container>
                            <p>{item.intro}</p>
                        </Container>
                    </Col>
                </Row>
            ))
        }

        </>
    )
}

export default StoreInfo