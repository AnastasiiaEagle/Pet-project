import "@style/panelManager/window_inf/orderCard.css"

import { Delete } from '@components/button/Delete'
import { Update } from '@components/button/Update'


export const OrderCard = (props) => {
    return(
        <>
            <div className="order_card">
                <h1 className="order_card__number">
                    № {props.id}
                </h1>
                <div className="order_card__header">
                    <p className="order_card__name">
                        {props.name}
                    </p>
                    <p className="order_card__size">
                        Розмір товару: {props.size}
                    </p>
                    <p className="order_card__number">
                        Кількість: {props.number}
                    </p>
                </div>
                <div className="order_card__materials">
                    <p className="order_card__wood">
                        {props.wood}
                    </p>
                    <p className="order_card__color">
                        {props.color}
                    </p>
                    <p className="order_card__additional">
                        {props.additional}
                    </p>
                </div>
                <div className="order_card__price">
                    <p className="order_card__cost">
                        {props.cost} ₴
                    </p>
                    <div className="btn">
                        <Update
                        id={props.id}
                        state={"order"}
                        discount={props.discount}
                        productInfId={props.productInfId}
                        />
                        <Delete
                            id={props.id}
                            idCustomer={props.idCustomer}
                            state={"order"}
                            />
                    </div>
                </div>
            </div>
        </>
    )
}