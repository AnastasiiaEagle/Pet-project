import '@style/panelAdmin/window_inf/productShow.css'

export const ProductSize = (props) => {
    return (
        <>
        <div className="size">
            <div className="size_tovar">
                <p>Розмір: {props.size}</p>
            </div>
            <div className="meter">
                <p>Квадратні метри: {props.meter}</p>
            </div>
        </div>
        </>
    )
}