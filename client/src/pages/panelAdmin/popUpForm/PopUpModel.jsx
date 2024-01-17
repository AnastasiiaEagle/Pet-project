import "@style/panelAdmin/popUpForm/popUp.css"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { postWood, getWood, updateWood } from "@redux/features/wood/woodSlice"
import { postColor, getColor, updateColor } from "@redux/features/color/colorSlice"
import { postAdditional, getAdditional, updateAdditional } from "@redux/features/additional/additionalSlice"

import { Save } from '@components/button/Save'
import { Close } from '@components/button/Close'
import { Select } from "@components/select/Select";


export const PopUpModel = () => {
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState("bacgraund_black")

    const select = useSelector((state)=>state.selectMenu.select)
    const stateAdd = useSelector((state)=>state.listener.addBool)
    const stateUpdate = useSelector((state)=>state.listener.updateBool)
    const stateUpdateId = useSelector((state)=>state.listener.id)

  
    const [image, setImg] = useState("")
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [type, setType] = useState("")

    const [inputName, setInputName] = useState("input")
    const [inputCost, setInputCost] = useState("input")

    const callbackSelect = (type) =>{
        setType(type)
        console.log(type)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(stateAdd && ((image==="" || name.trim()==="" || cost.trim()==="") || (type==="" && select === "3"))){
            if(name.trim()===""){
                setInputName("input error")
            }
            if(cost.trim()===""){
                setInputCost("input error")
            }
            toast.error("Ви вказали не всі дані!")
        }else{
            if(name.length<25){
                if(!isNaN(cost)){
                    const data = new FormData()
                    if(stateAdd){
                        data.append("name", name)
                        data.append("cost", cost)
                        data.append("image", image)
                        if(select === "2"){
                            await dispatch(postWood(data))
                            await dispatch(getWood())
                        }
                        if(select === "3"){
                            data.append("id_type", type)
                            await dispatch(postAdditional(data))
                            await dispatch(getAdditional())           
                        }
                        if(select === "4"){
                            await dispatch(postColor(data))
                            await dispatch(getColor())
                        }
                        await toast("Збереження пройшло успішно")
                    }else if(stateUpdate){
                        data.append("id", stateUpdateId)
                        if(image!==""){
                            data.append("image", image)
                        }
                        if(name.trim()!==""){
                            data.append("name", name)
                        }
                        if(cost.trim()!==""){
                            data.append("cost", cost)
                        }
                        if(select === "2"){
                            await dispatch(updateWood(data))
                            await dispatch(getWood())
                        }
                        if(select === "3"){
                            console.log(type)
                            if(type!==""){
                                data.append("id_type", type)
                            }
                            await dispatch(updateAdditional(data))
                            await dispatch(getAdditional())           
                        }
                        if(select === "4"){
                            await dispatch(updateColor(data))
                            await dispatch(getColor())
                        }
                        await toast("Оновлення пройшло успішно")
                    }
                    setImg("")
                    setCost("")
                    setName("")
                    setInputName("input")
                    setInputCost("input")
                }else{
                    toast.error("Вартість не може позначатись літерами")
                }
            }else{
                toast.error("Довжина перевищила 25 символів!")
            }
        }
    }

    useEffect(()=>{
        if((stateAdd || stateUpdate) && (select === "2" || select === "3" || select === "4")){
            setPopUp("bacgraund_black true")
        }else{
            setImg("")
            setCost("")
            setName("")
            setPopUp("bacgraund_black")
            setInputName("input")
            setInputCost("input")
        }
    }, [select, stateAdd, stateUpdate])

    return (
        <>
            <div className={popUp}>
                <div className="pop-up">
                    <h1 className="title">Добавити новий елемент</h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex">
                            <div className="photo">
                                {image && <img className="img" src={URL.createObjectURL(image)} alt="Фото" />}
                                <input className="upload_btn" type="file"
                                    onChange={e => setImg(e.target.files[0])}
                                />
                            </div>
                            <div className="data">
                                {select==="3" && (<Select onSelect={callbackSelect}/>)}
                                <label className="label">
                                    Назва
                                    <input className={inputName} type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder={stateUpdate ? "Введіть нову назву..." : "Введіть назву..."}/>
                                </label>
                                <label className="label">
                                    Вартість
                                    <input className={inputCost} type="text" 
                                        value={cost}
                                        onChange={e => setCost(e.target.value)}
                                        placeholder={stateUpdate ? "Вкажіть нову вартість..." : "Вкажіть вартість..."}/>
                                </label>
                                <div className="btn">
                                        <Save />
                                        <Close />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}