import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Image } from 'react-bootstrap'
import Axios from '../../Axios'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


/**
 * Axios接收資料error，圖片
 */
function RecommendStore({ baseUrl }) {
    const [data, setData] = useState(null)

    // react-slick 設定專區
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        margin: 10
    }
    const navigate = useNavigate()
    const handlerOnclick = (id) =>{
        navigate(`store/${id}`)
    }

    const getData = () =>{
      // 取得推薦商家
      Axios().get('store/search/recommand/')
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
                        <div className='select-type' key={item.id} onClick={() => handlerOnclick(item.id)}>
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