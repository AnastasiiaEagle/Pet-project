import '@style/panelAdmin/window_inf/material.css'

import { Delete } from '@components/button/Delete'
import { Update } from '@components/button/Update'

export const Material = (props) => {
    return (
        <>
            <div className="material">
                <div className="material__img">
                    <img className='img' src={`http://localhost:3002/${props.photo}`} alt="Матеріал" />
                </div>
                <div className="content">
                    {props.type && (<p className="text">{props.type}</p>)}
                    <p className="name text">{props.name}</p>
                    <p className="cost text">{props.cost}</p>
                    <div className="btn">
                        <Update id={props.id} />
                        <Delete key={props.id} id={props.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}