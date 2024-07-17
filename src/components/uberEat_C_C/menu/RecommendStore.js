import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Image } from 'react-bootstrap'
import Axios from '../../Axios'


/**
 * Axios接收資料error，圖片
 */
function RecommendStore({ baseUrl }) {
    const [data, setData] = useState(null)
    // url
    useEffect(() => {

    }, [])

    // react-slick 設定專區
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        margin: 10
    }
    const handlerOnclick = (e) =>{
    }
    const getData = () =>{
      Axios().get('/store_sch/prefer/')
      .then((res)=>{
        let data = res.data
        setData(data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    

    useEffect(()=>{
      getData()
    },[])
  return (
    <div className='food-type-container'>
        <h4>推薦店家</h4>
        <div>
            <div className='food-type-list-recommend'>
                <Slider {...settings}>
                    {data &&
                     data.map((item)=>(
                        <div className='select-type' key={item.upid} onClick={handlerOnclick}>
                          <div className='type-content'>
                            <Image src={`${baseUrl}${item.pic}`} alt={item.name} className='type-img' rounded/>
                            <span className='food-type-name'>{item.name}</span>
                          </div>
                        </div>
                     ))
                    }
                </Slider>
            </div>
        </div>
    </div>
  )
}

export default RecommendStore