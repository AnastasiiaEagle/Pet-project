import '@style/components/button/update.css'

import { useDispatch } from 'react-redux'

import { setProductId } from '@redux/features/listener/listenerSlice'
import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'

export const Show = (props) => {
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(setProductId(props.id))
        dispatch(setSelectMenu("6.1"))
    }
    return (
        <>
            <button className='update_btn'
            onClick={onClick}>
                Перегляд
            </button>
        </>
    )
}