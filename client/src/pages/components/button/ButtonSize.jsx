import '@style/components/button/buttonSize.css'
import { useEffect, useState } from "react"

export const ButtonSize = (props) => {
    const [btnStyle, setBtnStyle] = useState("button")

    const buttonClick = (e) =>{
        e.preventDefault()
        props.onClick(props.id)
    }

    useEffect(()=>{
        if(props.active === props.id){
            setBtnStyle("button active")
        }else{
            setBtnStyle("button")
        }
    }, [props.active])
    return(
        <>
            <button 
            className={btnStyle}
            onClick={buttonClick}
            >{props.type}</button>

        </>
    )
}