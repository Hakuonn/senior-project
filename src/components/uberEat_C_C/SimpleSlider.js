import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap';

import Axios from '../Axios';
import Item from 'antd/es/list/Item';

function SimpleSlider({baseUrl}) {
  const [slideData,setSlideData] = useState(null)
  // 已將slide照片由後端提供：Ｄ
  useEffect(()=>{
    Axios().get('common/slidePic/')
    .then((res) => {
      setSlideData(res.data)
    })
    .catch((err) => {
      console.log("開發人員：無法正確導入照片，伺服器是否斷線，還是網址打錯呢？")
    })
  },[])

  return (
      <Carousel>
        {slideData && slideData.map((backend_url) =>(
          <Carousel.Item>
          <img
            className="d-block w-100"
            src={baseUrl+backend_url}
          />
        </Carousel.Item>
        ))}
      </Carousel>
  )
}



export default SimpleSlider