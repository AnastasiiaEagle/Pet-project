import '@style/shop/materialCard/materialCard.css'

export const MaterialCard = (props) => {
    return(
        <>
        <div className="material-card">
            <div className="material-card__img">
                <img src={`http://localhost:3002/${props.photo}`} alt="Матеріал" />
            </div>
            {props.type && (<p className="material-card__name">{props.type}</p>)}
            <p className="material-card__name">
                {props.name}
            </p>
            {props.cost!==0 && (
            <p className="material-card__cost">
                {props.cost}
            </p>)
            }
        </div>
        </>
    )}