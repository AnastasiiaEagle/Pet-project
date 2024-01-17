import { AdminHeader } from "@components/header/AdminHeader"
import { OrderCard } from "./windows_inf/OrderCard"
import { OrderUser } from "./windows_inf/OrderUser"
import { PopUpUpdate } from "./popUpForm/PopUpUpdate"
import { Update } from "@components/button/Update"
import { Delete } from "@components/button/Delete"
import { PopUpUpdateStatus } from "./popUpForm/PopUpUpdateStatus"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

// import { getProductSizeId } from '@redux/features/product/productSlice'
import { getWood } from '@redux/features/wood/woodSlice'
import { getColor } from '@redux/features/color/colorSlice'
import { getAdditional } from '@redux/features/additional/additionalSlice'
import { getOrderAllId } from "@redux/features/order/orderSlice"

export const OrderUserPage = () => {
    const dispatch = useDispatch()
    const {number} =useParams()

    const [stateOrderId, setStateOrder]=useState(false)

    const orderId = useSelector((state)=>state.order.dataAllId)

    const additionals = useSelector((state) => state.additional.data)
    const colors = useSelector((state) => state.color.data)
    const woods = useSelector((state) => state.wood.data)
    // const sizes = useSelector((state)=>state.product.data)
    // const stateProductInfId = useSelector((state)=>state.listener.id) //Id продукта


    useEffect(()=>{
        dispatch(getOrderAllId(number.replace(':', '')))
        dispatch(getWood())
        dispatch(getColor())
        dispatch(getAdditional())
        // dispatch(getProductSizeId(stateProductInfId))
        // console.log(stateProductInfId)
        if(orderId.length>0){
            setStateOrder(true)
        }
    }, [ woods.length>0, additionals.length>0, colors.length>0, orderId.length>0])

    return(
        <>
            <AdminHeader />
            <div className="container">
                {stateOrderId && (
                    <OrderUser 
                        key={orderId[0][0].id_customer}
                        id={orderId[0][0].id_customer}
                        col={orderId[0][0].col}
                        name={orderId[0][0].name_customer}
                        phone={orderId[0][0].phone_customer}
                        date={orderId[0][0].data}
                        email={orderId[0][0].email_customer}
                        status={orderId[0][0].status_customer}
                        address={orderId[0][0].address_customer}
                        boolBtn={false}
                    />
                )}
                {stateOrderId && orderId[1].map((elem)=>
                    <OrderCard 
                    key={elem.id_order}
                    id={elem.id_order}
                    productInfId={elem.id_product_inf}
                    discount={elem.discount}
                    idCustomer={orderId[0][0].id_customer}
                    color={elem.name_color}
                    wood={elem.name_wood}
                    additional={elem.name_additional}
                    number={elem.number}
                    name={elem.model}
                    size={elem.size}
                    cost={elem.cost_order}
                    />
                    )}
                    {stateOrderId && (
                        <div className="btn">
                        <Update
                        id={orderId[0][0].id_customer}
                        status={orderId[0][0].status_customer}
                        state={"customer"}
                            />
                        <Delete
                        id={orderId[0][0].id_customer}
                        state={"customer"}/>
                    </div>
                    )}
            </div>
            {woods.length>0 && colors.length>0 && additionals.length>0 &&
            (
                <PopUpUpdate 
                    // key={stateProductInfId}
                    // id={stateProductInfId}
                    woods={woods}
                    colors={colors}
                    additionals={additionals}
                />
            )
            }
            <PopUpUpdateStatus />
        </>
    )
}
