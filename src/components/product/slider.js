import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './slider.css'
function Slider (props) {
  console.log(props)
  return (
    <Carousel
    
    >
      {props.images &&
        props.images.map(image => (
          <div className='slider'>
            <img src={image} />
          </div>
        ))}
    </Carousel>
  )
}
export default Slider
