import '@style/shop/main/menu/menu.css'
import '@style/components/swiper/swiper.css'

import BigSlider from '../components/bigSlider/bigSlider'

import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Header } from "@components/header/Header"
import { Footer } from '@components/footer/Footer'
import { MenuSelect } from '@components/select/MenuSelect'
import { ProductCard } from '@components/card/productCard'
import { getProduct, getProductTypeId } from '@redux/features/product/productSlice'


export const CatalogPage = () => {
    const type = useSelector((state) => state.listener.id_type)
    const products = useSelector((state) => state.product.data)

    const dispatch = useDispatch()


    useEffect(()=>{
        if(type===""){dispatch(getProduct())}
        else{dispatch(getProductTypeId({type}))}
    }, [products])

    return(
        <>
            <Header />
            <div className="container">
                <div className="swiper__header">
                        <BigSlider />
                </div>
                <menu className="menu">
                <div className="menu__list">
                    <MenuSelect />
                </div>
            </menu>
            </div>
            <main className="main container">
                <h2 className="main__title">Наші товари</h2>
                <div className="main__list main__list_product">
                    {(Array.isArray(products) && products.length > 0) ? Object.values(products)?.map((elem)=>
                            <ProductCard 
                            key={elem.id_product_inf}
                            id={elem.id_product_inf}
                            type={elem.type}
                            name={elem.model}
                            discount={elem.discount}
                            cost={elem.cost_min}
                            photo={elem.photo_model}
                            />
                        ): <p className="arr_null">Список порожній...</p>}
                </div>
            </main>
            <Footer />
        </>
    )
}