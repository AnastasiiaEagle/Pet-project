import { useEffect, useState } from "react"


export const ProductPhoto = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        if(checked===false){
            setChecked(true)
        }else{
            setChecked(false)
        }
    }

    useEffect(()=>{
        props.callbackPhoto({"id":props.id, "checked":checked})
    }, [checked])

    return (
        <>
            <div className="photo">
                <input className="photo__x" type="checkbox"
                checked={checked}
                onChange={handleChange}/>
                <img src={`http://localhost:3002/${props.photo}`} alt="Фото" className="img" />
            </div>
        </>
    )
}