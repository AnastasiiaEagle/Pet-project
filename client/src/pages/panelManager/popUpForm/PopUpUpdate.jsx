import "@style/panelAdmin/popUpForm/popUp.css"

import { MaterialSelct } from "@components/select/MaterialSelect"
import { ButtonSize } from "@components/button/ButtonSize"
import { Save } from "@components/button/Save"
import { Close } from "@components/button/Close"
import { InputNumber } from "@components/input/inputNumber"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProductSizeId } from '@redux/features/product/productSlice'
import { updateOrderId, getOrderAllId, getOrderId, setOrderIdNull} from '@redux/features/order/orderSlice'

export const PopUpUpdate = (props) => {
    const dispatch = useDispatch()
    const {number} =useParams()

    const stateProductInfId = useSelector((state)=>state.listener.productId) //Id продукта
    const stateUpdate = useSelector((state)=>state.listener.updateBool)
    const stateUpdateStatus = useSelector((state)=>state.listener.status) // Статус для визначення показу вікна оновлень

    const stateUpdateId = useSelector((state)=>state.listener.id)// Id замовлення
    const disc = useSelector((state)=>state.listener.number) //скидка
    const sizes = useSelector((state)=>state.product.data)


    const [popUp, setPopUp] = useState("bacgraund_black")

    const [numberProduct, setNumber] = useState(0)
    const [active, setActive] = useState(null)  // Активна кнопка
    const [nameSize, setNameSize] = useState(null)
    const [size, setSize] = useState(0)
    const [selectWood, setSelectWood] = useState(null) // Вибір дерева
    const [nameWood, setNameWood] = useState(null)
    const [costWood, setCostWood] = useState(0)
    const [selectColor, setSelectColor] = useState(null) // Вибір кольору
    const [nameColor, setNameColor] = useState(null)
    const [costColor, setCostColor] = useState(0)
    const [selectAdditional, setSelectAdditional] = useState(null) // Вибір додаткового матеріалу
    const [nameAdditional, setNameAdditional] = useState(null)
    const [costAdditional, setCostAdditional] = useState(0)

    const [cost, setCost] = useState(0)

    let order = useSelector((state)=>state.order.dataId)

    const defaulState = () =>{
        setSelectWood(null)
        setNameWood(null)
        setCostWood(0)
        setSelectColor(null)
        setNameColor(null)
        setCostColor(0)
        setSelectAdditional(null)
        setNameAdditional(null)
        setCostAdditional(0)
        setActive(null)
        setNameSize(null)
        setSize(0)
        setCost(0)
        setNumber(0)
    }
    const handlerSubmit = async(e) =>{
        e.preventDefault()

        await dispatch(updateOrderId({"id":stateUpdateId, "order": {
            "product":active,
            "wood": selectWood,
            "color":selectColor,
            "additional":selectAdditional,
            "number": numberProduct,
            "cost": cost
        }}))
        await dispatch(getOrderAllId(number))
        toast("Oновлення пройшло успішно")
    }

    const onClickToggleButton = (elem) =>{
        sizes.forEach(met => {
            if(met.id_product===elem){
                setNameSize(met.size)
                setSize(met.meter)
            } 
        })
        setActive(elem)

    }
    const onSelectWood = (elem) => {
        setSelectWood(elem)
        props.woods.forEach(wood => {
            if(wood.id_wood===Number(elem)){
                setNameWood(wood.name_wood)
                setCostWood(wood.cost)
            }
        })
    }
    const onSelectColor = (elem) => {
        props.colors.forEach(color=>{
            if(color.id_color===Number(elem)){
                setNameColor(color.name_color)
                setCostColor(color.cost)
            }
        })
        setSelectColor(elem)
    }
    const onSelectAdditional = (elem) => {
        props.additionals.forEach(addit=>{
            if(addit.id_additional===Number(elem)){
                setNameAdditional(addit.name_additional)
                setCostAdditional(addit.cost)
            }
        })
        setSelectAdditional(elem)
    }
    const onInputNumber = (elem) => {
        setNumber(elem)
    }

    useEffect(()=>{
        if(stateUpdate && stateUpdateStatus===undefined){
            dispatch(getProductSizeId(stateProductInfId))
            dispatch(getOrderId(stateUpdateId))
            setPopUp("bacgraund_black true")
            if(order.length>0 && numberProduct===0){
                onInputNumber(order[0].number)
            }
            let cost = (size * costWood + costColor + costAdditional)*numberProduct
            if(disc){
                cost = Math.floor(cost-(cost*disc/100))
            }
            setCost(cost)
        }else{
            dispatch(setOrderIdNull())
            defaulState()
            setPopUp("bacgraund_black")
        }
    }, [order.length, sizes.length>0, cost, size, costWood, costColor, costAdditional, stateUpdate, nameWood, nameColor, nameAdditional, nameSize, numberProduct])

    return(
        <>
            <div className={popUp}>
                <div className="pop-up">
                    <form onSubmit={handlerSubmit}>
                        <h1 className="title">Редагування замовлення</h1>
                        <div className="pop-up__top">
                            <div className="pop-up__grid">
                                <div className="pop-up__left">
                                    <div className="pop-up__cont">
                                        {props.woods.length!==0 && 
                                            (
                                                <MaterialSelct 
                                                material={props.woods}
                                                onSelect={onSelectWood}
                                                />
                                            )
                                        }
                                    </div>
                                    <div className="pop-up__cont">
                                        {props.colors.length!==0 &&
                                            (
                                                <MaterialSelct 
                                                material={props.colors}
                                                onSelect={onSelectColor}
                                                />
                                            )
                                        }
                                    </div>
                                    <div className="pop-up__cont">
                                        {props.additionals.length!==0 &&
                                            (
                                                <MaterialSelct 
                                                material={props.additionals}
                                                onSelect={onSelectAdditional}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="pop-up__right">
                                    <div className="pop-up__cont">
                                        {sizes.length>0 && sizes.map((size)=>
                                            <ButtonSize 
                                            key={size.id_product}
                                            id={size.id_product}
                                            type={size.size}
                                            active={active}
                                            onClick={onClickToggleButton}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pop-up__down">
                            <p className="pop-up__text">Розмір товару: <span>{
                                (order.length > 0 && sizes.length>0 && nameSize===null) ? sizes.forEach(elem=>{
                                    if(elem.id_product===order[0].id_product){
                                        onClickToggleButton(elem.id_product)
                                    } 
                                }) : nameSize
                            }</span></p>
                            <p className="pop-up__text">Тип дерева: <span>{
                                 (order.length > 0 && nameWood===null) ? props.woods.forEach(elem=>{
                                    if(elem.id_wood===order[0].id_wood){
                                        onSelectWood(elem.id_wood)
                                    } 
                                }) : nameWood
                            }</span></p>
                            <p className="pop-up__text">Колір: <span>{
                                (order.length > 0 && nameColor===null) ? props.colors.forEach(elem=>{
                                    if(elem.id_color===order[0].id_color){
                                        onSelectColor(elem.id_color)
                                    } 
                                }) : nameColor
                            }</span></p>
                            <p className="pop-up__text">Додатковий матерал: <span>{
                                (order.length > 0 && nameAdditional===null) ? props.additionals.forEach(elem=>{
                                    if(elem.id_additional===order[0].id_additional){
                                        onSelectAdditional(elem.id_additional)
                                    } 
                                }) : nameAdditional
                            }</span></p>
                            <p className="pop-up__text">Кількімть товару <InputNumber
                                                                         onInput={onInputNumber}
                                                                         defaultValue={numberProduct}
                                                                         /></p>
                            <p className="pop-up__text">Вартість: <span>{cost===0 ? (order[0]?.cost_order || 0) : cost} ₴</span></p>
                        </div>
                        <div className="btn">
                            <Save />
                            <Close />
                        </div>
                    </form>
                </div>
            </div>
        </>
        )
    }