import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { getWood } from '@redux/features/wood/woodSlice'
import { getColor } from '@redux/features/color/colorSlice'
import { getAdditional } from '@redux/features/additional/additionalSlice'

export const BasketCard = (props) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [wood, setWood] = useState(null)
    const [color, setColor] = useState(null)
    const [additional, setAdditional] = useState(null)
    
    const additionals = useSelector((state) => state.additional.data)
    const colors = useSelector((state) => state.color.data)
    const woods = useSelector((state) => state.wood.data)

    const onClick = (e) => {
        props.onClickDelete(props.id)
    }

    useEffect(()=>{
        dispatch(getWood())
        dispatch(getColor())
        dispatch(getAdditional())
        if( woods.length>0 && additionals.length>0 && colors.length>0 ){
            setLoading(true)

            console.log(props)
            if(Array.isArray(woods)){
                woods.map((elem)=>{
                    if(String(elem.id_wood)===props.wood){
                        setWood({"name": elem.name_wood, "photo":elem.photo_wood})
                    }
                })
            }
            if(Array.isArray(colors)){
                colors.map((elem)=>{
                    if(String(elem.id_color)===props.color){
                        setColor({"name": elem.name_color, "photo":elem.photo_color})
                    }
                })
            }
            if(Array.isArray(additionals)){
                additionals.map((elem)=>{
                if(String(elem.id_additional)===props.additional){
                    setAdditional({"name": elem.name_additional, "photo":elem.photo_additional})
                }
            })}
        }

    }, [woods.length>0, additionals.length>0, colors.length>0])

    return(
        <>
            <div className="basket-card">
                <div className="grid">
                    <div className="basket-card__img">
                        <img src={`http://localhost:3002/${props.photo}`} alt="" />
                    </div>
                    <div className="basket-card__inf">
                        <p className="basket-card__name">
                            {props.name}
                        </p>
                        <p className="basket-card__size">
                            {props.size}
                        </p>
                        {loading &&
                            (
                                <ul className="basket-card__list">
                            <li className="list__item">
                                <div className="item_img">
                                    <img src={`http://localhost:3002/${wood.photo}`} alt="" />
                                </div>
                                <p className="item_name">
                                {wood.name}    
                                </p>   
                            </li>
                            <li className="list__item">
                                <div className="item_img">
                                    <img src={`http://localhost:3002/${color.photo}`} alt="" />
                                </div>
                                <p className="item_name">
                                {color.name}   
                                </p>   
                            </li>
                            <li className="list__item">
                                <div className="item_img">
                                    <img src={`http://localhost:3002/${additional.photo}`} alt="" />
                                </div>
                                <p className="item_name">
                                {additional.name} 
                                </p>   
                            </li>
                        </ul>
                            )
                        }
                        <div className="basket-card__list basket-card__down">
                            <p className="cost">
                                Вартість: {props.cost}
                            </p>
                            <p className="number">
                                Кількість: {props.number}
                            </p>
                        </div>
                    </div>
                </div>
                 <button className="btn_dump"
                    onClick={onClick} >
                    Видалити
                 </button>
            </div>
        </>
    )
}