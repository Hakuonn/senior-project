import React from 'react'
import { Container, Image } from 'react-bootstrap'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../../../css/uberEat_customer.css'

/*** 
 * 食物類別選擇
 ***/
function FoodTypeSelect({ setType, setWebaction }) {
    // 模擬的 foodType 數據
    const foodType = [
        {
            "id": 1,
            "ft": "速食",
            "img": "https://i.imgur.com/cdPiEG3.png"
        },
        {
            "id": 2,
            "ft": "日式",
            "img": "https://i.imgur.com/r0AeOyb.png"
        },
        {
            "id": 3,
            "ft": "美式",
            "img": "https://i.imgur.com/JZPV6gu.png"
        },
        {
            "id": 4,
            "ft": "中式",
            "img": "https://i.imgur.com/5t2aRx5.png"
        },
        {
            "id": 5,
            "ft": "台式",
            "img": "https://i.imgur.com/r0AeOyb.png"
        },
        {
            "id": 6,
            "ft": "素食",
            "img": "https://i.imgur.com/GZDG8id.png"
        },
        {
            "id": 7,
            "ft": "手搖飲",
            "img": "https://i.imgur.com/nN9KhF3.png"
        },
        {
            "id": 8,
            "ft": "炸物",
            "img": "https://i.imgur.com/6dQ4F1o.png"
        }
    ];

    // react-slick 設定專區
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5
    };

    const handlerOnclick = (e) => {
        setType(e.target.alt);
        setWebaction('type');
    };

    return (
        <div className='food-type-container'>
            <h4>餐點類別</h4>
            <div>
                <div className='food-type-list'>
                    <Slider {...settings}>
                        <div className='select-type' key={0} onClick={handlerOnclick}>
                            <Image src={'https://i.imgur.com/c8f8XVR.png'} alt={'all'} className='type-img' rounded />
                            <span className='food-type-name'>All</span>
                        </div>
                        {foodType.map((item) => (
                            <div className='select-type' key={item.id} onClick={handlerOnclick}>
                                <Image src={item.img} alt={item.ft} className='type-img' rounded />
                                <span className='food-type-name'>{item.ft}</span>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default FoodTypeSelect;
