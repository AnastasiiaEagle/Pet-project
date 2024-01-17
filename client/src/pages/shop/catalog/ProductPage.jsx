import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { getProductId } from '@redux/features/product/productSlice'
import { getWood } from '@redux/features/wood/woodSlice'
import { getColor } from '@redux/features/color/colorSlice'
import { getAdditional } from '@redux/features/additional/additionalSlice'

import { Header } from '@components/header/Header'
import { ProductIdCard } from '@components/card/productIdCard';
import { Footer } from '@components/footer/Footer'


export const ProductPage = () => {
    const {productId} =useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state.product.dataId)
    const additionals = useSelector((state) => state.additional.data)
    const colors = useSelector((state) => state.color.data)
    const woods = useSelector((state) => state.wood.data)

    const [stateProductId, setStateProductId] = useState(false)


    useEffect(()=>{
        dispatch(getProductId(productId.replace(':', '')))
        dispatch(getWood())
        dispatch(getColor())
        dispatch(getAdditional())
        if(product.length!==0 && woods.length!==0 && additionals.length!==0 && colors.length!==0 ){
            setStateProductId(true)
          }
    }, [product.length!==0, woods.length!==0, additionals.length!==0, colors.length!==0])
    return(
        <>
            <Header />
            {stateProductId && (<ProductIdCard
                key={product[0][0].id_product_inf}
                id={product[0][0].id_product_inf}
                type={product[0][0].type}
                name={product[0][0].model}
                cost={product[0][0].cost_min}
                description={product[0][0].description}
                discount={product[0][0].discount}
                sizes={product[1]}
                photos={product[2]}
                woods={woods}
                additionals={additionals}
                colors={colors}
            />)}

            <Footer />
        </>
    )
}

