import "@style/panelManager/window_inf/orderUser.css"

import { InfOrder } from "@components/button/InfOrder"

export const OrderUser = (props) => {
    return (
        <>
            <div className="order_user">
                <h2>
                    №{props.id}
                </h2>
                <div className="order_user__top">
                    <h1 className="order_user__name">
                        {props.name}
                    </h1>
                    <div className="order_user__comm">
                        <p className="order_user__phone">
                            Номер телефону: {props.phone}
                        </p>
                        <p className="order_user__email">
                            E-mail: {props.email}
                        </p>
                    </div>
                </div>
                <div className="order_user__inf">
                    <p className="inf__date">
                        {props.date}
                    </p>
                    <p className="inf__number">
                        Кількість замовлень: {props.col}
                    </p>
                    <p className="inf__status">
                        Статус замовлення: <span>{props.status}</span>
                    </p>
                    <p className="inf__number">
                        Адреса замовника: {props.address}
                    </p>
                    {props.boolBtn && 
                    <InfOrder
                        id={props.id}
                    />}
                </div>
            </div>
        </>
    )
}