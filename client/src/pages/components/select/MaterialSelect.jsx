import '@style/components/select/materialSelect.css'

import { useEffect, useState } from 'react'

export const MaterialSelct = (props) => {
    const [option, setOption] = useState(props.selectId)

    const onOption = (e)=>{
        setOption(e.target.value)
    }

    useEffect(()=>{
        props.onSelect(option)
    }, [option])

    return(
        <>
            <div className="material_select">
                <select value={option} onChange={onOption}>
                    {props.material.map((elem, index)=>{
                        return (<option value={elem.id_wood || elem.id_color || elem.id_additional} key={index} >{elem.name_wood || elem.name_color || elem.name_additional}</option>)
                    })}
                </select>
            </div>
        </>
    )
}