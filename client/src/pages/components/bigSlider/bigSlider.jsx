import '@style/components/swiper/swiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

export const BigSlider = () => {

    return(
        <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            className='swiper__block'
        >
            <SwiperSlide>
                <img className='swiper__img' src="img/swiper/swiper1.jpg" alt="Картинка 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img className='swiper__img' src="img/swiper/swiper2.jpg" alt="Картинка 1" />
            </SwiperSlide>
        </Swiper>
    )
}

export default BigSlider