import "@style/panelAdmin/popUpForm/popUp.css"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { postProduct, getProduct } from "@redux/features/product/productSlice"

import { Save } from '@components/button/Save'
import { Close } from '@components/button/Close'
import { Select } from "@components/select/Select"

export const PopUpProduct = () =>{
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState("bacgraund_black")
    const [inputName, setInputName] = useState("input")
    const [inputDescr, setInputDescr] = useState("input textarea")
    const [inputCost, setInputCost] = useState("input")
    const [inputDisc, setInputDisc] = useState("input")
    const [inputSize, SetInputSize] = useState("input")

    const [images, setImgs] = useState(null)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [descr, setDescr] = useState("")
    const [cost, setCost] = useState("")
    const [disc, setDisc] = useState("0")

    const [size, setSize] = useState("")
    const [size2, setSize2] = useState("")
    const [size3, setSize3] = useState("")
    const [meter, setMeter] = useState("")
    const [meter2, setMeter2] = useState("")
    const [meter3, setMeter3] = useState("")

    const select = useSelector((state)=>state.selectMenu.select)
    const stateAdd = useSelector((state)=>state.listener.addBool)
    const stateUpdate = useSelector((state)=>state.listener.updateBool)
    const stateUpdateId = useSelector((state)=>state.listener.id)

    const defaulState = () =>{
        setInputName("input")
        setInputDescr("input textarea")
        setInputCost("input")
        setInputDisc("input")
        SetInputSize("input")
        setSize("")
        setSize2("")
        setSize3("")
        setMeter("")
        setMeter2("")
        setMeter3("")
        setImgs(null)
        setName("")
        setDescr("")
        setCost("")
        setDisc("")
    }

    const callbackSelect = (type) =>{
        setType(type)
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
        
        if(images===null || name.trim()==="" || descr.trim()==="" || type==="" || sizes.length===0 || cost===""){
            if(name.trim()===""){
                setInputName("input error")
            }
            if(descr.trim()===""){
                setInputDescr("input error textarea")
            }
            if(cost===""){
                setInputCost("input error")
            }
            if(sizes.length===0){
                SetInputSize("input error")
            }

            toast.error("Ви вказали не всі дані!")
        }else if(images.length>5){
            toast.error("Ви можете завантажити не бльше 5 зображень!")
        }else if( name.length>25 || descr.length>250 || isNaN(cost) || (disc!=="" && isNaN(disc))){
            if(name.length>25){
                setInputName("input error")
                toast.error("Довжина назви перевищила 25 символів!")
            }
            if(descr.length>250){
                setInputDescr("input error textarea")
                toast.error("Довжина опису перевищила 250 символів!")
            }
            if(isNaN(cost)){
                setInputCost("input error")
                toast.error("Введіть вартість в числах")
            }
            if(isNaN(disc)){
                setInputDisc("input error")
                toast.error("Введіть числові дані до знижки")
            }
        }else{
            const data = new FormData()
            data.append("name", name)
            data.append("type", type)
            data.append("description", descr)
            data.append("cost", cost)
            if(disc===""){
                let discount = 0
                data.append("discount", discount)
            }else{
                data.append("discount", disc)
            }
            sizes.forEach((size)=>{
                data.append("size", size)
            })
            for(let file of images){
                data.append("image", file)
            }
            await dispatch(postProduct(data))
            await dispatch(getProduct())
            await toast("Збереження пройшло успішно")
            defaulState()
        }
    }

    useEffect(()=>{
        if((stateAdd || stateUpdate) && select === "6"){
            setPopUp("bacgraund_black true")
        }else{
            setPopUp("bacgraund_black")
            defaulState()
        }
    }, [select, stateAdd, stateUpdate])
    return(
        <>
        <div className={popUp}>
                <div className="pop-up">
                    <h1 className="title">Добавити новий елемент</h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="flex">
                            <label className="label">
                                Назва
                                <input className={inputName} type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Введіть назву..."/>
                            </label>
                            <Select onSelect = {callbackSelect}/>
                        </div>
                        <div className="flex">
                            <label className="label">
                                    Опис<br/>
                                    <textarea className={inputDescr} type="text"
                                    value={descr}
                                    onChange={e => setDescr(e.target.value)}
                                    placeholder="Введіть назву..."/>
                            </label>
                        </div>

                        <input className="upload_btn" type="file" onChange={e => setImgs(e.target.files)} multiple/><br />

                        <label className="label">
                                Розмір<br/>
                                <div className="flex">
                                    <input className={inputSize} type="text"
                                    value={size}
                                    onChange={e => setSize(e.target.value)}
                                    placeholder="Введіть назву розміра..."/>
                                    <input className={inputSize} type="text"
                                    value={meter}
                                    onChange={e => setMeter(e.target.value)}
                                    placeholder="Введіть квадратні метри..."/>
                                </div>
                                <div className="flex">
                                    <input className="input" type="text"
                                    value={size2}
                                    onChange={e => setSize2(e.target.value)}
                                    placeholder="Введіть назву розміра..."/>
                                    <input className="input" type="text"
                                    value={meter2}
                                    onChange={e => setMeter2(e.target.value)}
                                    placeholder="Введіть квадратні метри..."/>
                                </div>
                                <div className="flex">
                                    <input className="input" type="text"
                                    value={size3}
                                    onChange={e => setSize3(e.target.value)}
                                    placeholder="Введіть назву розміра..."/>
                                    <input className="input" type="text"
                                    value={meter3}
                                    onChange={e => setMeter3(e.target.value)}
                                    placeholder="Введіть квадратні метри..."/>
                                </div>
                        </label>
                        <hr />
                        <div className="flex cost">
                            <input className={inputCost} type="text"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                            placeholder="Введіть вартість..."/>
                            <input className={inputDisc} type="text"
                            value={disc}
                            onChange={e => setDisc(e.target.value)}
                            placeholder="Введіть скидку..."/>
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

//Доробити це прокляте оновлення


// Якщо встигатимеш сорутвання товару та його виведення

//Редагування замовлення

// Де ти **** раніше було!!!!! >:(     \/
// Можливо до замовлення варто добавити пункт адреси, для майбутнього відправлення

