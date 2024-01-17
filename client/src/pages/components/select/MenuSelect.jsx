import '@style/components/select/menuSelect.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAdditionalType } from '@redux/features/additionalType/additionalTypeSlice'
import { getProductType } from '@redux/features/productType/productTypeSlice'
import { setTypeId } from '@redux/features/listener/listenerSlice'

export const MenuSelect = (props) => {
    const additionalTypes = useSelector((state) => state.additionalType.data)
    const productType = useSelector((state) => state.productType.data)

    const dispatch = useDispatch()

    const [option, setOption] = useState("")

    useEffect(()=>{
        if(props.state ==="3"){
            dispatch(getAdditionalType())
            dispatch(setTypeId(option))
        }else{
            dispatch(getProductType())
            dispatch(setTypeId(option))
        }
    }, [option])

    return(
        <>
            <div className="menu__select">
                <select onChange={(e)=>setOption(e.target.value)}>
                    <option value="">Сортування</option>
                    {
                        (props.state==="3" && Array.isArray(additionalTypes) && additionalTypes.length > 0 ) ?
                        additionalTypes.map((elem, index)=>{
                            return (<option key={index} value={elem.id_type_additional}>{elem.type_additional}</option>)
                        }):
                        Array.isArray(productType) && productType.length > 0 &&
                        productType.map((elem, index)=>{
                            return (<option key={index} value={elem.id_type}>{elem.type}</option>)
                        })
                    }
                </select>
            </div>
        </>
    )
}