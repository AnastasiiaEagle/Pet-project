import '@style/shop/productCard/productCard.css'

export const ProductCard = (props) => {
    return(
        <>
            <div className="product-card">
                <a href={`/catalog/product/:${props.name}/:${props.id}`} className="product-card__link">
                    <div className="product-card__img">
                        <img src={`http://localhost:3002/${props.photo}`} alt={props.name} />
                    </div>
                </a>
                {
                    props.discount!==0 && (
                        <div className="product-card__discount">
                        -{props.discount}%
                        </div>
                    )
                }
                <p className="product-card__name">
                    {props.name}
                </p>
                <p className="product-card__cost">
                    {props.cost} ₴
                </p>
            </div>
        </>
    )
}