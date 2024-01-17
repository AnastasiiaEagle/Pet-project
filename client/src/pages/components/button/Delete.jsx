import '@style/components/button/delete.css'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

import { deleteWood, getWood } from '@redux/features/wood/woodSlice'
import { deleteAdditionalType, getAdditionalType } from '@redux/features/additionalType/additionalTypeSlice'
import { deleteAdditional, getAdditional } from '@redux/features/additional/additionalSlice'
import { deleteColor, getColor } from '@redux/features/color/colorSlice'
import { deleteProductType, getProductType } from '@redux/features/productType/productTypeSlice'
import { deleteUser, getUsers } from "@redux/features/auth/authSlice"
import { deleteProduct, getProduct } from '@redux/features/product/productSlice'

import { deleteOrder, getOrderAllId, getCustomer, deleteCustomer } from '@redux/features/order/orderSlice'

import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'


export const Delete = (props) => {
    const select = useSelector((state)=>state.selectMenu.select)
    const navigate = useNavigate();
    
    const dispatch = useDispatch()


    const onClick = async() =>{
        switch(select){
            case "1":{
              await dispatch(deleteAdditionalType(props.id))
              await dispatch(getAdditionalType())
              break
            }
            case "2":{
              await dispatch(deleteWood(props.id))
              await dispatch(getWood())
              break
            }
            case "3":{
              await dispatch(deleteAdditional(props.id))
              await dispatch(getAdditional())
              break
            }
            case "4":{
              await dispatch(deleteColor(props.id))
              await dispatch(getColor())
              break
            }
            case "5":{
              await dispatch(deleteProductType(props.id))
              await dispatch(getProductType())
              break
            }
            case "6":{
              await dispatch(deleteProduct(props.id))
              await dispatch(getProduct())
              break
            }
            case "6.1":{
              await dispatch(deleteProduct(props.id))
              await dispatch(getProduct())
              dispatch(setSelectMenu("6"))
              break
            }
            case "7":{
              await dispatch(deleteUser(props.id))
              await dispatch(getUsers())
              break
            }
          }
          if(props.state==="order"){
            await dispatch(deleteOrder(props.id))
            await dispatch(getOrderAllId(props.idCustomer))
          } else if(props.state==="customer"){
            await dispatch(deleteCustomer(props.id))
            await dispatch(getCustomer)
            navigate(`/admin`)
          }
          await toast("Видалення пройшло успішно")
    }
    
    return (
        <>
            <button className="delete_btn" onClick={onClick}>
                Видалити
            </button>
        </>
    )
}

//При видаленні додати меседж з успішним та невдалим видаленням