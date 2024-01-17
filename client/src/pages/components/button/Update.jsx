import '@style/components/button/update.css'

import { useDispatch, useSelector } from 'react-redux'

import { setUpdateBool } from '@redux/features/listener/listenerSlice'
import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'


export const Update = (props) => {
    const select = useSelector((state)=>state.selectMenu.select)
    let update = null
    const dispatch = useDispatch()

    const onClick = () => {
        if(select==="6.1" && props.updateText==="Змінити фото"){
            update = {"update":false, "id": props.id}
            dispatch(setSelectMenu("6.3"))
        }else if(select==="6.1" && props.updateText==="Змінити розміри"){
            update = {"update":false, "id": props.id}
            dispatch(setSelectMenu("6.4"))
        }else if(select==="6.1"){
            update = {"update":false, "id": props.id}
            dispatch(setSelectMenu("6.2"))
        }
        else if(props.state==="customer"){
            update = {"update":true, "id": props.id, "status": props.status}
        }else if(props.state==="order"){
            update = {"update":true, "id": props.id, "productId": props.productInfId, "discount": props.discount}
        }else{
            update = {"update":true, "id": props.id}
        }
        dispatch(setUpdateBool(update))
    }

    return (
        <>
            <button className='update_btn'
                onClick={onClick}
            >
                {props.updateText ? (props.updateText) : ("Змінити")}
            </button>
        </>
    )
}