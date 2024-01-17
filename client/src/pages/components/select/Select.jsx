import '@style/components/select/select.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setTypeId } from '@redux/features/listener/listenerSlice'

export const Select = (props) =>{

    const dispatch = useDispatch()

    const [option, setOption] = useState("")

    const select = useSelector((state)=>state.selectMenu.select)
    const additionalTypes = useSelector((state) => state.additionalType.data)
    const addBool = useSelector((state) => state.listener.addBool)
    const updateBool = useSelector((state) => state.listener.updateBool)
    const productType = useSelector((state) => state.productType.data)

    useEffect(()=>{
        if(((select==="3" || select==="6") && (addBool || updateBool)) || select==="6.2"){
            props.onSelect(option)
        }else{
            dispatch(setTypeId(option))
        }

    }, [option])

    return(
        <>
            <div className="select">
                <select onChange={(e)=>setOption(e.target.value)}>
                    <option value="">------</option>
                    {
                        (select==="3") && typeof additionalTypes==="object" ?
                        additionalTypes.map((elem, index)=>{
                            return (<option key={index} value={elem.id_type_additional}>{elem.type_additional}</option>)
                        }):
                        (select==="6" || select==="6.2") && typeof productType==="object" ? 
                        productType.map((elem, index)=>{
                            return (<option key={index} value={elem.id_type}>{elem.type}</option>)
                        }):
                        null
                    }
                </select>
            </div>
        </>
    )
}
