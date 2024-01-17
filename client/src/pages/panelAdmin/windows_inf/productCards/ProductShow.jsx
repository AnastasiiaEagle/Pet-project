import '@style/panelAdmin/window_inf/productShow.css'


import { Delete } from "@components/button/Delete"
import { Update } from "@components/button/Update"
import { ProductSize } from './ProductSize'
import {ProductImagesSlider} from '@components/swiper/Swiper'

export const ProductShow = (props) => {
    return (
        <>
        <div className="product_show">
            <div className="product_show__top">
                <div className="product_show__swiper">
                    <ProductImagesSlider photos={props.photos}/>
                </div> 
                <div className="product_show__content">
                    <h2 className="name_type">{props.type}</h2>
                    <h1 className="name">{props.name}</h1>
                    <p className="description">
                        {props.description}
                    </p>
                </div>
            </div>
            <div className="product_show__inf">
                 {props.sizes.map((size)=>
                    <ProductSize  
                    key={size.id_product}
                    id={size.id_product}
                    size={size.size}
                    meter={size.meter}
                    />
                )}
            </div>
            <div className="product_show__down">
                <div className='product_show__cost'>
                    <p className='cost'>Вартість: {props.cost}</p>
                    <p className='discount'>Скидка: {props.discount}</p>
                </div>
                <div className="btn">
                    <Update id={props.id}/>
                    <Update id={props.id} updateText={"Змінити фото"}/>
                    <Update id={props.id} updateText={"Змінити розміри"}/>
                    <Delete key={props.id} id={props.id}/>
                </div>
            </div>
        </div>
        </>
    )}