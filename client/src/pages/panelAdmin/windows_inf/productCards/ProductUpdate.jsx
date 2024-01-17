import "@style/panelAdmin/window_inf/productUpdate/productUpdate.css"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Save } from '@components/button/Save'
import { Select } from "@components/select/Select"

import { updateProduct } from '@redux/features/product/productSlice'
import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'

export const ProductUpdate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productID = useSelector((state)=>state.listener.id)

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [descr, setDescr] = useState("")
    const [cost, setCost] = useState("")
    const [disc, setDisc] = useState("")

    const callbackSelect = (type) =>{
        setType(type)
    }

    const defaulState = () =>{
        setName("")
        setDescr("")
        setCost("")
        setDisc("")
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let data = new Object()
        if(type!==""){
            data.type=type
        }
        if(name.trim()!==""){
            data.name=name
        }
        if(descr.trim()!==""){
            data.description = descr
        }
        if(cost!==""){
            data.cost = cost
        }
        if(disc!==""){
            data.discount = disc
        }

        await dispatch(updateProduct({productID ,data}))
        await toast("Збереження пройшло успішно")
        await dispatch(setSelectMenu("6"))
        await navigate("/admin")
        defaulState()
    }

    return (
        <>
            <div className="product_update">
                <h1 className="title">Редагування товару</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <label className="label">
                            Назва
                            <input className="input" type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Введіть назву..."/>
                        </label>
                        <Select onSelect = {callbackSelect} />
                    </div>
                    <div className="flex">
                        <label className="label">
                                Опис<br/>
                                <textarea className="input textarea" type="text"
                                value={descr}
                                onChange={e => setDescr(e.target.value)}
                                placeholder="Введіть назву..."/>
                        </label>
                    </div>
                    <hr />
                    <div className="flex cost">
                        <input className="input" type="text"
                        value={cost}
                        onChange={e => setCost(e.target.value)}
                        placeholder="Введіть вартість..."/>
                        <input className="input" type="text"
                        value={disc}
                        onChange={e => setDisc(e.target.value)}
                        placeholder="Введіть скидку..."/>
                    </div>
                    <div className="btn">
                        <Save />
                    </div>
                </form>
            </div>
        </>
    )
}

//Прослідкувати щоб в сумі залишившихся фото та доданих не перевищувало 5

// ІД виводиться неправильно
// Зміна та додання нових розмірів товарів
// Доробити оновлення товару
// Зробити оновлення фотографій