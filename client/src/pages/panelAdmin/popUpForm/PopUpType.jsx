import "@style/panelAdmin/popUpForm/popUp.css"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { postAdditionalType, getAdditionalType, updateAdditionalType } from "@redux/features/additionalType/additionalTypeSlice"
import { postProductType, getProductType, updateProductType } from "@redux/features/productType/productTypeSlice"


import { Save } from '@components/button/Save'
import { Close } from '@components/button/Close'

export const PopUpType = () => {
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState("bacgraund_black")
    const [input, setInpuut] = useState("input")
    const [type, setType] = useState('')
    const select = useSelector((state)=>state.selectMenu.select)
    const stateAdd = useSelector((state)=>state.listener.addBool)
    const stateUpdate = useSelector((state)=>state.listener.updateBool)
    const stateUpdateId = useSelector((state)=>state.listener.id)


    const handleSubmit = (e) => {
        e.preventDefault()
        if(type.trim() !== ""){
            if(type.length<=25){
                if(stateAdd){
                    if(select === "1"){
                        dispatch(postAdditionalType({type}))
                        dispatch(getAdditionalType())
                    }else if(select === "5"){
                        dispatch(postProductType({type}))
                        dispatch(getProductType())
                    }
                    setType("")
                    toast("Збереження пройшло успішно")
                }else if(stateUpdate){
                    if(select === "1"){
                        dispatch(updateAdditionalType({stateUpdateId, type}))
                        dispatch(getAdditionalType())
                    }else if(select === "5"){
                        dispatch(updateProductType({stateUpdateId, type}))
                        dispatch(getProductType())
                    }
                    setType("")
                    toast("Оновлення пройшло успішно")
                }
                setInpuut("input")
                setType("")
            }else{
                setInpuut("input error")
                toast.error("Довжина перевищила 25 символів!")
            }
        }else{
            setInpuut("input error")
            toast.error("Вкажіть назву!")
        }
    }

    useEffect(()=>{
        if((stateAdd || stateUpdate) && (select === "1" || select === "5")){
            setPopUp("bacgraund_black true")
            // console.log(type.length>25)
        }else{
            setPopUp("bacgraund_black")
            setInpuut("input")
        }
    }, [select, stateAdd, stateUpdate, type.length])

    return (
        <>
            <div className={popUp}>
                <div className="pop-up">
                    <h1 className="title">Добавити новий елемент</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="label">
                            Назва
                            <input className={input} type="text"
                                value={type}
                                name="type"
                                onChange={e => setType(e.target.value)}
                                placeholder="Введіть назву..."/>
                        </label>
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