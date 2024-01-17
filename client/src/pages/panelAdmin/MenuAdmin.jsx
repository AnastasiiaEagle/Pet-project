import '@style/panelAdmin/menuAdmin.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'

export const MenuAdmin = () => {
    const dispatch = useDispatch()
    const [select, setSelect] = useState("")


    useEffect( () => {
        dispatch(setSelectMenu(select))
    }, [select])

    return (
      <>
        <nav className='nav'>
            <ul className="admin__menu">
                <li className="menu__item">
                    <button className="item_link mat" onClick={() => setSelect("1")}>Типи матеріалів</button>
                </li>
                <li className="menu__item">
                <button className="item_link mat" onClick={() => setSelect("2")}>Дерево</button>
                </li>
                <li className="menu__item">
                    <button className="item_link mat" onClick={() => setSelect("3")}>Додаткові матеріали</button>
                </li>
                <li className="menu__item">
                    <button className="item_link mat" onClick={() => setSelect("4")}>Види кольорів</button>
                </li>
            </ul>
            <ul className="admin__menu">
                <li className="menu__item">
                    <button className="item_link prod" onClick={() => setSelect("5")}>Типи товарів</button>
                </li>
                <li className="menu__item">
                    <button className="item_link prod" onClick={() => setSelect("6")}>Список товарів</button>
                </li>
            </ul>
            <ul className="admin__menu">
                <li className="menu__item">
                    <button className="item_link user" onClick={() => setSelect("7")}>Керування користувачами</button>
                </li>
            </ul>
        </nav>
      </>
    )
}