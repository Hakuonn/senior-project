import React from 'react'
import { Carousel } from 'react-bootstrap';
import slider1 from '../../imgs/sliders/slider1.png'
import slider2 from '../../imgs/sliders/slider2.png'
import slider3 from '../../imgs/sliders/slider3.png'
import slider4 from '../../imgs/sliders/slider4.png'


function RecipeSlider() {
  
  return (
      <Carousel className='mt-5'>
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider1}
          alt="我們的健康食譜功能"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider2}
          alt="剩食對環境影響"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider3}
          alt="什麼是剩食"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slider4}
          alt="我們的飲食控管功能"
        />
      </Carousel.Item>
      </Carousel>
  )
}



export default RecipeSlider