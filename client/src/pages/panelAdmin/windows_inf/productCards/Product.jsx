import '@style/panelAdmin/window_inf/product.css'

import { Show } from '@components/button/Show'
import { Delete } from '@components/button/Delete'

export const Product = (props) => {
    return (
        <>
            <div className="product">
                <div className="product__img">
                    <img className='img' src={`http://localhost:3002/${props.photo}`} alt="Фото товару" />
                </div>
                <div className="content">
                    <p className='product__type text'>Тип продукту: {props.type}</p>
                    <p className="product__name text">{props.name}</p>
                    <div className="product__cost_inf">
                        <p className="product__cost text">Вартість: {props.cost}</p>
                        <p className='product__discount text'>Скидка: {props.discount}</p>
                    </div>
                    <div className="btn">
                        <Show id={props.id}/>
                        <Delete key={props.id} id={props.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}