import "@style/panelAdmin/popUpForm/popUp.css"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { postAuth, getUsers } from "@redux/features/auth/authSlice"

import { Save } from '@components/button/Save'
import { Close } from '@components/button/Close'

export const PopUpAuth = () => {
    const dispatch = useDispatch()
    const [popUp, setPopUp] = useState("bacgraund_black")
    const [inputPassword, setInputPassword] = useState("input")
    const [inputLogin, setInputLogin] = useState("input")

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const select = useSelector((state)=>state.selectMenu.select)
    const stateAdd = useSelector((state)=>state.listener.addBool)
    const users = useSelector((state) => state.user.users)

    const handleSubmit = (e) =>{
        e.preventDefault()
        //Спробуй через трайкеч переписати

        try {
            if(login.trim() === "" || password.trim() === ""){
                if(login.trim() === ""){
                    setInputLogin("input error")
                }
                if(password.trim() === ""){
                    setInputPassword("input error")
                }
                throw new SyntaxError("Введіть коректні дані")
            }else{
                try {
                    users.forEach(elem => {
                        if(elem.login===login){
                            throw new SyntaxError("Введіть інший логін")
                        }
                    });
                    dispatch(postAuth({login, password}))
                    dispatch(getUsers())
                    setLogin("")
                    setPassword("")
                } catch (error) {
                    setInputLogin("input error")
                    toast.error(error.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(stateAdd && select === "7"){
            setPopUp("bacgraund_black true")
        }else{
            setLogin("")
            setPassword("")
            setPopUp("bacgraund_black")
            setInputPassword("input")
            setInputLogin("input")
        }
    }, [select, stateAdd])

    return(
        <>
            <div className={popUp}>
                <div className="pop-up">
                    <h1 className="title">Зареєструвати нового користувача</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="label">
                            Логін
                            <input className={inputLogin} type="text" 
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            placeholder="Введіть логін користувача..."
                            />
                        </label>
                        <label className="label">
                            Пароль
                            <input className={inputPassword} type="text" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Введіть пароль користувача..."
                            />
                        </label>
                        <div className="btn">
                            <Save />
                            <Close />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}