import { useState, useEffect } from "react";

export const InputNumber = (props) => {
    const [number, setNumber] = useState(1)

    const onChange = (e) => {
        setNumber(e.target.value)
        props.onInput(e.target.value)
    }

    useEffect(()=>{
        if(props.defaultValue!==number){
            setNumber(props.defaultValue)
        }
    }, [props.defaultValue])

    return(
        <>
            <input type="number"
                step="1"
                min="1"
                max="100"
                value={number}
                onChange={onChange}/>
        </>
    )
}