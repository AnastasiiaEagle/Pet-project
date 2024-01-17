import '@style/shop/productIdCard/productIdCard.css'

import { useState, useEffect } from "react";

import {ProductIdImagesSlider} from "@components/swiper/SwiperProductId"
import { ButtonSize } from '@components/button/ButtonSize'
import { MaterialSelct } from '@components/select/MaterialSelect';
import { AddToBasket } from '@components/button/AddToBasket';
import { InputNumber } from '@components/input/inputNumber';


export const ProductIdCard = (props) => {

    const [active, setActive] = useState(props.sizes[0].id_product)
    const [woodImg, setWoodImg]=useState(props.woods[0].photo_wood)
    const [colorImg, setColorImg]=useState(props.colors[0].photo_color)
    const [additionImg, setAdditionalImg]=useState(props.additionals[0].photo_additional)
    const [selectWood, setSelectWood] = useState("")
    const [selectColor, setSelectColor] = useState("")
    const [selectAdditional, setSelectAdditional] = useState("")

    const [size, setSize] = useState(props.sizes[0].meter)
    const [nameSize, setNameSize] = useState(props.sizes[0].size)
    const [costWood, setCostWood] = useState(props.woods[0].cost)
    const [costColor, setCostColor] = useState(props.colors[0].cost)
    const [costAdditional, setCostAdditional] = useState(props.additionals[0].cost)
    const [costProduct, setCostProduct] = useState(0)
    const [number, setNumber] = useState(1)

    const onClickToggleButton = (elem) =>{
        setActive(elem)
        props.sizes.forEach(met => {
            if(met.id_product===elem){
                setNameSize(met.size)
                setSize(met.meter)
            } 
        })
    }
    const onSelectWood = (elem) => {
        setSelectWood(elem)
        props.woods.forEach(wood => {
            if(String(wood.id_wood)===elem){
              setWoodImg(wood.photo_wood)
              setCostWood(wood.cost)
            }  
        })
    }
    const onSelectColor = (elem) => {
        setSelectColor(elem)
        props.colors.forEach(color => {
            if(String(color.id_color)===elem){
                setColorImg(color.photo_color)
                setCostColor(color.cost)
            }  
        })
    }
    const onSelectAdditional = (elem) => {
        setSelectAdditional(elem)
        props.additionals.forEach(addition => {
            if(String(addition.id_additional)===elem){
                setAdditionalImg(addition.photo_additional)
                setCostAdditional(addition.cost)
            }  
        })
    }
    const onInputNumber = (elem) => {
        setNumber(elem)
    }
    
    useEffect(()=>{
        let cost = Math.floor((size * costWood + costColor + costAdditional)*number)
        if(props.discount){
            cost = Math.floor(cost-(cost*props.discount/100))
        }
        setCostProduct(cost)
    }, [active, size, costWood, costColor, number, costAdditional, costProduct, selectWood, selectColor, selectAdditional])
    return(
        <>
            <div className="main__product container">
                <div className="product__grid">
                    <div className="product__swiper">
                        <ProductIdImagesSlider photos={props.photos}/>
                    </div>
                    <div className="product__inf">
                        <h2 className="name_type">{props.type}</h2>
                        <h1 className="name">{props.name}</h1>
                        <p className="description">
                            {props.description}
                        </p>
                        <form>
                            <ul className="product__zise_list">
                                {props.sizes.map((size) => 
                                    <ButtonSize 
                                    key={size.id_product}
                                    id={size.id_product}
                                    type={size.size}
                                    active={active}
                                    onClick={onClickToggleButton}
                                    />
                                )}                                                             
                            </ul>
                            <ul className="product__material">
                                <div className="material_swiper">
                                    <div className="material_inf">
                                        <div className="material_inf__img">
                                            <img src={`http://localhost:3002/${woodImg}`} alt='Фото'/>
                                        </div>
                                        <MaterialSelct 
                                        material={props.woods}
                                        onSelect={onSelectWood}
                                        />
                                    </div>
                                    <div className="material_inf">
                                        <div className="material_inf__img">
                                            <img src={`http://localhost:3002/${colorImg}`} alt='Фото'/>
                                        </div>
                                        <MaterialSelct 
                                        material={props.colors}
                                        onSelect={onSelectColor}
                                        />
                                    </div>
                                    <div className="material_inf">
                                        <div className="material_inf__img">
                                            <img src={`http://localhost:3002/${additionImg}`} alt='Фото'/>
                                        </div>
                                        <MaterialSelct 
                                        material={props.additionals}
                                        onSelect={onSelectAdditional}
                                        />
                                    </div>
                                </div>
                            </ul>
                            <div className="product__cost">
                                <p className='cost'>{costProduct} ₴ 
                                {
                                    props.discount!==0 && (<span className="discount">-{props.discount}%</span>)
                                }
                                </p>
                                
                                <div className="input_number">
                                    <p className='input_number__text'>
                                        Кількість товару
                                    </p>
                                    <InputNumber onInput={onInputNumber}/>
                                </div>
                            </div>
                            <AddToBasket 
                                id={props.id}
                                productId={active}
                                type={props.type}
                                name={props.name}
                                photo={props.photos[0].photo_model}
                                size={nameSize}
                                number={number}
                                cost={costProduct}
                                wood={selectWood===undefined ? String(props.woods[0].id_wood):
                                selectWood}
                                color={selectColor===undefined ? String(props.colors[0].id_color):
                                selectColor}
                                additional={selectAdditional===undefined ? String(props.additionals[0].id_additional):
                                selectAdditional}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

