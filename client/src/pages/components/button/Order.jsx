import '@style/components/button/order.css'

import { useDispatch } from 'react-redux'

import { setAddBool } from '@redux/features/listener/listenerSlice'

export const Order = () => {
    const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault()
        dispatch(setAddBool(true))
    }
    return(
        <>
            <button className="btn_order" onClick={onClick}>Замовити</button>
        </>
    )
}