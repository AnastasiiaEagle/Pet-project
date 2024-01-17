import '@style/panelAdmin/window_inf/type.css'

import { Update } from '@components/button/Update'
import { Delete } from '@components/button/Delete'


export const Type = (props) => {
    return (
        <>
            <div className="type">
                <p className="name">
                    {props.name}
                </p>
                <div>
                    <Update id={props.id} />
                    <Delete key={props.id} id={props.id} />
                </div>
            </div>
        </>
    )
}