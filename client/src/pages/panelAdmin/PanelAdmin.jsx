import '@style/panelAdmin/panelAdmin.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProductUpdatePhoto } from './windows_inf/productCards/ProductUpdatePhoto'
import { MenuComponent } from "./MenuComponent"
import { Type } from './windows_inf/Type'
import { Material } from './windows_inf/Material'
import { Product } from './windows_inf/productCards/Product'
import { Users } from './windows_inf/Users'
import { ProductUpdate } from './windows_inf/productCards/ProductUpdate'
import { ProductShow } from './windows_inf/productCards/ProductShow'
import { ProductUpdateSize } from './windows_inf/productCards/ProductUpdateSize'

import { getWood } from '@redux/features/wood/woodSlice'
import { getAdditionalType } from '@redux/features/additionalType/additionalTypeSlice'
import { getAdditional, getAdditionalId } from '@redux/features/additional/additionalSlice'
import { getColor } from '@redux/features/color/colorSlice'
import { getProductType } from '@redux/features/productType/productTypeSlice'
import { getProduct, getProductId, getProductTypeId } from '@redux/features/product/productSlice'
import { getUsers } from '@redux/features/auth/authSlice'


export const PanelAdmin = () => {
  const select = useSelector((state)=>state.selectMenu.select)
  const woods = useSelector((state) => state.wood.data)
  const additionalTypes = useSelector((state) => state.additionalType.data)
  const additionals = useSelector((state) => state.additional.data)
  const colors = useSelector((state) => state.color.data)
  const productTypes = useSelector((state) => state.productType.data)
  const products = useSelector((state) => state.product.data)
  const product = useSelector((state) => state.product.dataId)

  const users = useSelector((state) => state.user.users)

  const type = useSelector((state) => state.listener.id_type)
  const productId = useSelector((state)=>state.listener.productId)

  const dispatch = useDispatch()

  useEffect(()=>{
    switch(select){
      case "1":{
        dispatch(getAdditionalType())
        break
      }
      case "2":{
        dispatch(getWood())
        break
      }
      case "3":{
        if(type===""){
          dispatch(getAdditional())
        }else{
          dispatch(getAdditionalId({type}))
        }
        break
      }
      case "4":{
        dispatch(getColor())
        break
      }
      case "5":{
        dispatch(getProductType())
        break
      }
      case "6":{
        if(type===""){
          dispatch(getProductType())
          dispatch(getProduct())
        }else{
          dispatch(getProductTypeId({type}))
        }
        break
      }
      case "6.1":{
        dispatch(getProductId(productId))
        break
      }
      case "7":{
        dispatch(getUsers())
        break
      }
    }
  }, [select, type, product.length!==0])

    return (
      <>
          <main>
            {
              select==="1" || select==="2" || select==="4" || select==="5" ? <MenuComponent add={true} search={false} select={false} /> : 
              select==="3" ? <MenuComponent add={true} search={false} select={true} /> :
              select==="6" ? <MenuComponent  add={true} search={false} select={true} /> :
              select==="7" ? <MenuComponent add={true} search={false} select={false} /> :
              <MenuComponent add={false} search={false} select={false} />
            }
            {(select==="1" &&  Array.isArray(additionalTypes) && additionalTypes.length > 0) ? Object.values(additionalTypes).map((elem)=><Type
              key={elem.id_type_additional}
              id={elem.id_type_additional}
              name={elem.type_additional}
              /> 
            ): <p> </p>}
            {(select==="2" && Array.isArray(woods) && woods.length > 0) ? Object.values(woods).map((elem)=><Material 
              key={elem.id_wood}
              id={elem.id_wood}
              photo={elem.photo_wood}
              name={elem.name_wood}
              cost={elem.cost}
               />
            ): <p> </p>}
            {(select==="3" && Array.isArray(additionals) && additionals.length > 0) ? Object.values(additionals).map((elem)=><Material
              key={elem.id_additional}
              id={elem.id_additional}
              type={elem.type_additional}
              id_type={elem.id_type_additional}
              photo={elem.photo_additional}
              name={elem.name_additional}
              cost={elem.cost}
              />
            ): <p> </p>}
            {(select==="4" && Array.isArray(colors) && colors.length > 0) ? Object.values(colors).map((elem)=><Material 
              key={elem.id_color}
              id={elem.id_color}
              photo={elem.photo_color}
              name={elem.name_color}
              cost={elem.cost}
              />
            ): <p> </p>}
            {(select==="5" && Array.isArray(productTypes) && productTypes.length > 0) ? Object.values(productTypes).map((elem)=><Type
              key={elem.id_type}
              id={elem.id_type}
              name={elem.type}
              />
            ): <p> </p>}
            {(select==="6" && Array.isArray(products) && products.length > 0) ? products.map((elem)=><Product 
              key={elem.id_product_inf}
              id={elem.id_product_inf}
              type={elem.type}
              name={elem.model}
              discount={elem.discount}
              cost={elem.cost_min}
              photo={elem.photo_model}
              />
            ): <p> </p>}
            {select==="6.1" && Array.isArray(product) && product.length > 0 && (<ProductShow
              key={product[0][0].id_product_inf}
              id={product[0][0].id_product_inf}
              type={product[0][0].type}
              name={product[0][0].model}
              cost={product[0][0].cost_min}
              description={product[0][0].description}
              discount={product[0][0].discount}
              sizes={product[1]}
              photos={product[2]}
            />)}
            {select==="6.2" && (<ProductUpdate 
              key={product[0][0].id_product_inf}
              id={product[0][0].id_product_inf}
              id_type={product[0][0].id_model}
              id_name={product[0][0].id_model}
              name={product[0][0].model}
              cost={product[0][0].cost_min}
              description={product[0][0].description}
              discount={product[0][0].discount}
              sizes={product[1]}
            />)}
            {select==="6.3" && (<ProductUpdatePhoto 
              key={product[0][0].id_product_inf}
              id={product[0][0].id_product_inf}
              photos={product[2]}
            />)}
            {select==="6.4" && (<ProductUpdateSize
              key={product[0][0].id_product_inf}
              id={product[0][0].id_product_inf}
              sizes={product[1]}
            />)}
            {(select==="7" && Array.isArray(users) && users.length > 0 ) ? Object.values(users).map((elem)=><Users 
            key={elem.id_user}
            id={elem.id_user}
            login={elem.login}
            />
            ): <p> </p>}
          </main>
      </>
    )
}