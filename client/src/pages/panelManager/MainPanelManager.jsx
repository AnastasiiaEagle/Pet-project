import { AdminHeader } from "@components/header/AdminHeader"
import { OrderUser } from "./windows_inf/OrderUser"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"

import { getCustomer } from "@redux/features/order/orderSlice"


export const MainPanelManager = () => {
    const dispatch = useDispatch()

    const orders = useSelector((state)=>state.order.data)    

    useEffect(()=>{
        dispatch(getCustomer())
    },[orders.length!==0])

    return(
        <>
            <AdminHeader />
            <div className="container">
                {
                    Array.isArray(orders) && orders.length > 0 ? orders.map(elem=>
                    <OrderUser 
                    key={elem.id_customer}
                    id={elem.id_customer}
                    col={elem.col}
                    name={elem.name_customer}
                    phone={elem.phone_customer}
                    date={elem.data}
                    email={elem.email_customer}
                    status={elem.status_customer}
                    address={elem.address_customer}
                    boolBtn={true}
                    />) : <p className="arr_null">Список порожній...</p>
                }
            </div>
        </>
    )
}