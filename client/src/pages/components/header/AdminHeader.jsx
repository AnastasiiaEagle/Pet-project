import '@style/admin/admin.css'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { logout } from '@redux/features/auth/authSlice'

export const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Ви вийшли зі свого профілю')
        navigate("../auth/sign-in")
    }
    return (
        <>
            <header className="header">
                <div className="header__box container">
                <h1 className="header__name">AdminPanel</h1>
                <button className="exit" onClick={logoutHandler} href="">Вихід</button>
                </div>
            </header>
        </>
    )
}