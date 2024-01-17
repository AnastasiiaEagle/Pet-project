import "@style/panelAdmin/popUpForm/popUp.css"
import '@style/components/select/select.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { Close } from "@components/button/Close"
import { Save } from "@components/button/Save"

import { updateOrderStatus, getOrderAllId } from "@redux/features/order/orderSlice"


export const PopUpUpdateStatus = () => {
    const dispatch = useDispatch()

    const stateUpdate = useSelector((state)=>state.listener.updateBool)
    const stateUpdateId = useSelector((state)=>state.listener.id)
    const stateUpdateStatus = useSelector((state)=>state.listener.status)

    const status = ["Нове замовлення", "Схвалено", "Виконано"]
    const [popUp, setPopUp] = useState("bacgraund_black")

    const [option, setOption]= useState(stateUpdateStatus)
    const [state, setState] = useState("selected")

    const handlerSubmit = async(e) =>{
        e.preventDefault()
        
        await dispatch(updateOrderStatus({"id":stateUpdateId, "status":option}))
        await dispatch(getOrderAllId(stateUpdateId))
        toast("Оновлення пройшло успішно")
    }

    useEffect(()=>{
        if(stateUpdate && stateUpdateStatus!==undefined){
            setPopUp("bacgraund_black true")
        }else{
            setPopUp("bacgraund_black")
        }
    }, [stateUpdate])

    return(
        <>
            <div className={popUp}>
                <div className="pop-up">
                    <form onSubmit={handlerSubmit}>
                        <div className="pop-up__flex">
                            <div className="select">
                                <select onChange={(e)=>setOption(e.target.value)}>
                                    {status.map((elem, index)=>
                                        <option key={index} value={elem}>
                                            {elem}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="btn">
                                <Save />
                                <Close />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

//Доробити оновлення   selected={props.status===elem}