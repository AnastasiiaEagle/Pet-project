import '@style/components/swiper/swiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

export const ProductImagesSlider = (props) => {
  return (
    <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className='swiper__block'
    >
      {
        props.photos.map((el)=>(
        <SwiperSlide key={el.id_photo_model}>
          <img className='swiper__img' src={`http://localhost:3002/${el.photo_model}`} alt="Фото" />
        </SwiperSlide>))
      }
    </Swiper>
  )
}

ProductImagesSlider.propTypes = {}

export default ProductImagesSlider