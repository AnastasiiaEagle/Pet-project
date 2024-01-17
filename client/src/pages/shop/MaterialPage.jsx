import '@style/shop/main/menu/menu.css'
import '@style/shop/main/main.css'
import '@style/components/swiper/swiper.css'

import BigSlider from '../components/bigSlider/bigSlider'

import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Header } from "@components/header/Header"
import { MaterialCard } from '@components/card/materialCard'
import { MenuSelect } from '@components/select/MenuSelect'
import { Footer } from '@components/footer/Footer'

import { getWood } from '@redux/features/wood/woodSlice'
import { getAdditional, getAdditionalId } from '@redux/features/additional/additionalSlice'
import { getColor } from '@redux/features/color/colorSlice'
import { setTypeId } from '@redux/features/listener/listenerSlice'

export const MaterialPage = () => {
    const woods = useSelector((state) => state.wood.data)
    const statusWood = useSelector((state) => state.wood.status)
    const additionals = useSelector((state) => state.additional.data)
    const statusAddit = useSelector((state) => state.additional.status)
    const colors = useSelector((state) => state.color.data)
    const statusColors = useSelector((state) => state.color.status)
    const type = useSelector((state) => state.listener.id_type)


    const dispatch = useDispatch()

    const [state, setState] = useState("1")
    const [status, setStatus] = useState("")

    useEffect(()=>{
        switch(state){
            case "1":{
                dispatch(setTypeId(""))
                dispatch(getWood())
                setStatus(statusWood)
                break
            }
            case "2":{
                dispatch(setTypeId(""))
                dispatch(getColor())
                setStatus(statusColors)
                break
            }
            case "3":{
                if(type===""){
                    dispatch(getAdditional())
                }else{
                    dispatch(getAdditionalId({type}))
                }
                setStatus(statusAddit)
                break
            }
        }
    }, [state, type])

    return(
        <>
            <Header />
            <div className="container">
                <div className="swiper__header">
                        <BigSlider />
                </div>
                <menu className="menu">
                    <ul className="menu__list">
                        <li className="list_item">
                            <button className="item"
                            onClick={() => setState("1")}>
                                Види деревини
                            </button>
                        </li>
                        <li className="list_item">
                            <button className="item"
                            onClick={() => setState("2")}>
                                Фарба для дерева
                            </button>
                        </li>
                        <li className="list_item">
                            <button className="item"
                            onClick={() => setState("3")}>
                                Додаткові матеріали
                            </button>
                        </li>
                        <li className="list_item">
                        {state==="3" && <MenuSelect state={state}/>}
                        </li>
                    </ul>
                </menu>
            </div>
            <main className="main container">
                <h2 className="main__title">{
                    state==="1"?"Види деревини":
                    state==="2"?"Фарба для дерева":
                    "Додаткові матеріали"
                }</h2>
                <div className="main__list main__list_material">
                    {status!=="null" ? (state==="1"?
                    ((Array.isArray(woods) && woods.length > 0) ? Object.values(woods).map((elem)=><MaterialCard 
                    key={elem.id_wood}
                    id={elem.id_wood}
                    photo={elem.photo_wood}
                    name={elem.name_wood}
                    cost={elem.cost}
                    />): <p className="arr_null">Список порожній...</p>
                    ):
                    state==="2"?
                    ((Array.isArray(colors) && colors.length > 0) ? Object.values(colors)?.map((elem)=><MaterialCard
                    key={elem.id_color}
                    id={elem.id_color}
                    photo={elem.photo_color}
                    name={elem.name_color}
                    cost={elem.cost}
                    />): <p className="arr_null">Список порожній...</p>
                    ):
                    ((Array.isArray(additionals) && additionals.length > 0) ? Object.values(additionals)?.map((elem)=><MaterialCard
                    key={elem.id_additional}
                    id={elem.id_additional}
                    type={elem.type_additional}
                    id_type={elem.id_type_additional}
                    photo={elem.photo_additional}
                    name={elem.name_additional}
                    cost={elem.cost}
                    />): <p className="arr_null">Список порожній...</p>)
                    ): <p>Пусто</p>
                    }

                    
                </div>
            </main>
            <Footer />
        </>
        )
    }