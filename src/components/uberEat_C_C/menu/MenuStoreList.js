import React, { useEffect, useState } from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';


/**
 * useFetch問題，圖片
 */
function MenuStoreList({object, baseUrl}) {
  const [id, setSid] = useState(null)
  const [name, setName] = useState(null)
  const [intro, setIntro] = useState(null)
  const [pic, setPic] = useState(null)
  // url
  useEffect(() => {
  }, [])

  useEffect(()=>{
    setSid(object.id)
    setName(object.name)
    setIntro(object.intro)
    setPic(object.pic)
  },[id])
  
  return (
    <Col>
        <Link to={`/store/${id}`} className='menu-link-to-store'>
            <Card className='menu-store-list'>
                <Card.Img variant="top" src={`${baseUrl}${pic}`} />
                <Card.Body>
                  <Card.Title className='menu-card-title'>{name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{intro}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Link>
    </Col>
  )
}

export default MenuStoreList