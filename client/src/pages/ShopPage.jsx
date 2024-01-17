import '@style/shop/main/main.css'
import '@style/components/swiper/swiper.css'

import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Header }from '@components/header/Header'
import { ProductCard } from '@components/card/productCard'
import { getProduct } from '@redux/features/product/productSlice'
// import { MaterialCard } from '@components/card/materialCard'
import { Footer } from '@components/footer/Footer'
import BigSlider from './components/bigSlider/bigSlider'



export const ShopPage = () => {
  const products = useSelector((state) => state.product.data)
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getProduct())
  }, [])

  return(
    <>
        <Header />
        <main className="main container">
            <div className="swiper__header">
              <BigSlider />
            </div>
            
            <h2 className="main__title">Рекомендовано</h2>

            <div className="main__list main__list_product">
              {(Array.isArray(products) && products.length > 0) ? Object.values(products).map((elem)=>
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
