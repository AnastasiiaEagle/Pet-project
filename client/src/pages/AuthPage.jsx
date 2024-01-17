import '@style/auth/auth.css' 
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { postUser, logout } from "@redux/features/auth/authSlice"
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const LogIn = useSelector((state)=>state.user.token)
    const Message = useSelector((state)=>state.user.status)

    const handleSubmit = async (e) => {
        await e.preventDefault()
        await dispatch(postUser({login, password}))
    }

    useEffect( () => {
        if(Message) toast(Message)
        if(Message==="Ви ввели невірні дані"){
            dispatch(logout())
        }
        if(LogIn) navigate("/admin")
    }, [LogIn, Message])
    return (
        <>
            <div className="auth">
                <h1 className="auth__title">Авторизація</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <label className="form__title_input" htmlFor='login'>Login
                    <input 
                        className="form__input"
                        type="text"
                        value={login} 
                        onChange={e => setLogin(e.target.value)} 
                        placeholder="Введіть логін..." 
                        />
                    </label><br />
                    
                    <label className="form__title_input" htmlFor='password'>Password
                    <input 
                        className="form__input" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Введіть пароль..."
                        />
                    </label><br />
                    <button className="form__but">УВІЙТИ</button>
                </form>
            </div>
        </>
    )
}