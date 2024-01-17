import "@style/panelAdmin/window_inf/productUpdate/productUpdate.css"

import { useEffect, useState } from "react"

export const ProductSize = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        if(checked===false){
            setChecked(true)
        }else{
            setChecked(false)
        }
    }

    useEffect(()=>{
        props.callbackSize({"id":props.id, "checked":checked})
    }, [checked])

    return(
        <>
            <div className="sizes__flex">
                <p className="sizes__text">
                    Розмір: {props.size}
                </p>
                <p className="sizes__text">
                    Площа: {props.meter}
                </p>
                <input className="size__x" type="checkbox"
                    checked={checked}
                    onChange={handleChange}/>
            </div>
        </>
    )
}