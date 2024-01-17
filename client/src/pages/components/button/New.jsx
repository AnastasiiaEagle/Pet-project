import '@style/components/button/new.css'

import { useDispatch } from 'react-redux'

import { setAddBool } from '@redux/features/listener/listenerSlice'

export const New = () => {
    const dispatch = useDispatch()

    return (
        <>
            <button className='add_btn' 
            onClick={() => dispatch(setAddBool(true))}>
                Добавити
            </button>
        </>
    )
}