import "@style/panelAdmin/popUpForm/popUp.css"

import { Save } from "@components/button/Save"
import { Close } from "@components/button/Close"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { postOrder } from "@redux/features/order/orderSlice"
import { setAddBool } from '@redux/features/listener/listenerSlice'


export const SaveOrder = () => {
    const dispatch = useDispatch()

    const state = useSelector((state)=>state.listener.addBool)
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("basket")))

    const [popUp, setPopUp] = useState("bacgraund_black")
    const [inputName, setInputName] = useState("input")
    const [inputAddress, setInputAddress] = useState("input")
    const [inputPhone, setInputPhone] = useState("input")
    const [inputEmail, setInputEmail] = useState("input")

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [order, setOrder] = useState(null)
    

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(name.trim()==="" || address.trim()==="" || phone.trim()==="" || email.trim()===""){
            if(name.trim()===""){
                setInputName("input error")
            }
            if(address.trim()===""){
                setInputAddress("input error")
            }
            if(phone.trim()===""){
                setInputPhone("input error")
            }
            if(email.trim()===""){
                setInputEmail("input error")
            }
        }else{
            try {
                await dispatch(postOrder({name, phone, email, address, order}))
                await toast("Замовлення було успішно оформлено. З вами зв'яжуться протягом доби.")
                dispatch(setAddBool(false))
                setName("")
                setAddress("")
                setPhone("")
                setEmail("")
                setOrder("")
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        if(state){
            setPopUp("bacgraund_black true")
        }else{
            setPopUp("bacgraund_black")
            setInputName("input")
            setInputPhone("input")
            setInputEmail("input")
            setInputAddress("input")
            setName("")
            setAddress("")
            setPhone("")
            setEmail("")
            setOrder("")
        }
        if(basket){
            let data = []
            basket.map((elem)=>{
                data.push(
                    {
                    "id_product":elem.productId,
                    "id_wood": Number(elem.wood), 
                    "id_color": Number(elem.color),
                    "id_additional": Number(elem.additional),
                    "number": elem.number,
                    "cost": elem.cost
                    }
                )
            })
            setOrder(data)
        }
    }, [state, basket])

    return(
        <>
        <div className={popUp}>
            <div className="pop-up">
                <h1 className="title">Зробити замовлення</h1>
                <form onSubmit={handleSubmit}>
                    <label className="label">
                        Ім'я
                        <input className={inputName} type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ваше ім'я..."
                        />
                    </label>
                    <label className="label">
                        Адреса
                        <input className={inputAddress} type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Ваша адреса"
                        />
                    </label>
                    <label className="label">
                        Телефон
                        <input className={inputPhone} type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="066-052-3233"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        />
                    </label>
                    <label className="label">
                        e-mail
                        <input className={inputEmail} type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Ваш email"
                        pattern=".+@gmail.com"
                        />
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