import "@style/components/button/addToBasket.css"

import { toast } from 'react-toastify';

export const AddToBasket = (props) => {
    const onClick = (e) => {
        e.preventDefault()
        console.log(props.productId)
        let toBasket={
            "productId": props.productId,
            "type": props.type,
            "name": props.name,
            "photo": props.photo,
            "size": props.size,
            "number": props.number,
            "cost": props.cost,
            "wood": props.wood,
            "color": props.color,
            "additional": props.additional
        }
        console.log(toBasket)
        let arr = localStorage.getItem("basket")
        if(arr){
            arr = JSON.parse(arr)
            arr.push(toBasket)
            localStorage.setItem("basket", JSON.stringify(arr))
        }else{
            localStorage.setItem("basket", JSON.stringify([toBasket]))
        }
        toast("Товар додано до кошику")
    }

    return(
        <>
            <button className="btn_add" onClick={onClick}>Добавити в кошик</button>
        </>
    )
}