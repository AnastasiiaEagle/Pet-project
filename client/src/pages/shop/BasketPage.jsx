import '@style/shop/basketCard/basketCard.css'

import { BasketCard } from "@components/card/basketCard"

import { Header } from "@components/header/Header"
import { Footer } from '@components/footer/Footer'
import { Order } from "@components/button/Order"
import { SaveOrder } from '@components/pop-up/SaveOrder'

import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const BasketPage = () => {
    const navigate = useNavigate();

    const [sumCost, setSumCost]=useState(0)
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem("basket")))

    const basketDelete = (id) =>{
        let newBasket = basket
        newBasket.splice(id, 1)
        setBasket(newBasket)
        localStorage.setItem("basket", JSON.stringify(newBasket))
        toast("Товар було видалено з кошика")
        setSumCost(0)
        navigate("/basket")
    }
    useEffect(()=>{
        if(basket){
            let sum = 0
            basket.map((elem)=>{
                sum += elem.cost
            })
            setSumCost(sum)
        }
    }, [basket, sumCost])

    return(
        <>
            <SaveOrder/>
            <Header />
            <main className="main container">
                <h2 className="main__title">ВАШ КОШИК</h2>
                <div className="basket_box">
                    {
                       
                       Array.isArray(basket) && basket.length > 0 ? basket.map((elem, index)=>
                            <BasketCard
                            key={index}
                            id={index}
                            name={elem.name}
                            type={elem.type}
                            photo={elem.photo}
                            size={elem.size}
                            number={elem.number}
                            cost={elem.cost}
                            wood={elem.wood}
                            color={elem.color}
                            additional={elem.additional}
                            productId={elem.productId}
                            onClickDelete={basketDelete}
                            />
                        ): <p className="arr_null">Список порожній...</p>
                    }
                    <div className="order">
                        <p className="sum_cost">Сумарна вартість покупки: <span>{sumCost} ₴</span></p>
                        <Order/>
                    </div>
                </div>
            </main>
        </>
    )
}