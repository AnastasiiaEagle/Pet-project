import '@style/panelAdmin/window_inf/users.css'

import { Delete } from '@components/button/Delete'

export const Users = (props) => {
    return(
        <>
            <div className="users">
                <p className="login">{props.login}</p>
                <Delete key={props.id} id={props.id} />
            </div>
        </>
    )
}