import "@style/panelAdmin/window_inf/productUpdate/productUpdate.css"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Save } from '@components/button/Save'
import { ProductSize } from "./componentsUpdate/ProductSize";

import { updateProductSize, getProduct } from '@redux/features/product/productSlice'
import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'

export const ProductUpdateSize = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productID = useSelector((state)=>state.listener.id)

    const [sizeId, setSizeId] = useState([])

    const [size, setSize] = useState("")
    const [size2, setSize2] = useState("")
    const [size3, setSize3] = useState("")
    const [meter, setMeter] = useState("")
    const [meter2, setMeter2] = useState("")
    const [meter3, setMeter3] = useState("")

    const defaulState = () =>{
        setSize("")
        setSize2("")
        setSize3("")
        setMeter("")
        setMeter2("")
        setMeter3("")
    }

    const callbackSize = (elem) =>{
        let id = sizeId
        if(elem.checked){
            id.push(elem.id)
        }else{
            id.map((sizeId, index)=>{
                if(sizeId===elem.id){
                    id.splice(index, 1)
                }
            })
        }
        setSizeId(id)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        let sizes = []
        if(size.trim()!=="" && meter.trim()!==""){
            sizes.push(`${size},${meter}`)
        }
        if(size2.trim()!=="" && meter2.trim()!==""){
            sizes.push(`${size2},${meter2}`)
        }
        if(size3.trim()!=="" && meter3.trim()!==""){
            sizes.push(`${size3},${meter3}`)
        }
        let sizeLength = props.sizes.length - sizeId.length
        sizeLength += sizes.length
        if(sizeLength>3 || sizeLength===0){
            toast.error("Ви вказали забагато розмір")
        }else{
            await dispatch(updateProductSize({productID, sizes, sizeId}))
            await toast("Збереження пройшло успішно")
            await dispatch(getProduct(productID))
            await dispatch(setSelectMenu("6"))
            await navigate("/admin")
        }
    }

    //Якась помилка. Зробити щоб воно оновлювало сторінку та не давало назберігати уйму нових розмірів
    //Зробити щоб воно не давало можливість зберінати як в сумі виходить 0

return(
    <>
        <div className="product_update">
            <h1 className="title">Редагування розмірів</h1>
            <div className="product_update__sizes">
                {props.sizes.map((elem)=>
                    <ProductSize
                        key = {elem.id_product}
                        id = {elem.id_product}
                        size = {elem.size}
                        meter = {elem.meter}
                        callbackSize = {callbackSize}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    Розмір<br/>
                    <div className="flex">
                        <input className="input" type="text"
                        value={size}
                        onChange={e =>setSize(e.target.value)}
                        placeholder="Введіть назву розміра..."/>
                        <input className="input" type="text"
                        value={meter}
                        onChange={e =>setMeter(e.target.value)}
                        placeholder="Введіть квадратні метри..."/>
                    </div>
                    <div className="flex">
                        <input className="input" type="text"
                        value={size2}
                        onChange={e =>setSize2(e.target.value)}
                        placeholder="Введіть назву розміра..."/>
                        <input className="input" type="text"
                        value={meter2}
                        onChange={e =>setMeter2(e.target.value)}
                        placeholder="Введіть квадратні метри..."/>
                    </div>
                    <div className="flex">
                        <input className="input" type="text"
                        value={size3}
                        onChange={e =>setSize3(e.target.value)}
                        placeholder="Введіть назву розміра..."/>
                        <input className="input" type="text"
                        value={meter3}
                        onChange={e =>setMeter3(e.target.value)}
                        placeholder="Введіть квадратні метри..."/>
                    </div>
                </label>
                <br /><br /><br />
                <div className="btn">
                    <Save />
                </div>
            </form>
        </div>
    </>
)
}