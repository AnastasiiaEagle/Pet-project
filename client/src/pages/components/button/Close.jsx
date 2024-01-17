import '@style/components/button/close.css'

import { useDispatch } from 'react-redux'

import { setAddBool, setUpdateBool } from '@redux/features/listener/listenerSlice'
import { useEffect } from 'react'

export const Close = () => {
    const dispatch = useDispatch()

    const handleOnClick = (e) =>{
        e.preventDefault()
        dispatch(setAddBool(false))
        dispatch(setUpdateBool(false))
    }

    return(
        <>
            <button className="close_btn" onClick={(e) => handleOnClick(e)}>Закрити</button>
        </>
    )
}