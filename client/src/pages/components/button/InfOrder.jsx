 import '@style/components/button/infOrder.css'

import { useNavigate } from 'react-router-dom';

export const InfOrder = (props) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/admin/order/${props.id}`)
    }
    return (
        <>
            <button className="inf_order_btn"
            onClick={onClick}
            >Детальніше</button>
        </>
        )
    }