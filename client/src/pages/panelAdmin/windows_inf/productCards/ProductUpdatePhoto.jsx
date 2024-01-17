import "@style/panelAdmin/window_inf/productUpdate/productUpdate.css"

import { ProductPhoto } from "./componentsUpdate/ProductPhoto"
import { Save } from '@components/button/Save'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { updateProductPhoto } from '@redux/features/product/productSlice'
import { setSelectMenu } from '@redux/features/selectMenuAdmin/selectMenuSlice'

export const ProductUpdatePhoto = (props) =>{
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productID = useSelector((state)=>state.listener.id)

    const [imagesId, setImagesId] = useState([])
    const [images, setImgs] = useState(null)

    const callbackPhoto = (elem) =>{
        let id = imagesId
        if(elem.checked){
            id.push(elem.id)
        }else{
            id.map((photoId, index)=>{
                if(photoId===elem.id){
                    id.splice(index, 1)
                }
            })
        }
        setImagesId(id)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        let photoLength = imagesId.length
        if(images!==null){
            photoLength += images.length
        }
        if(photoLength>5 || photoLength===0){
            toast.error("Товар має мати не менше одного фото і не більше п'яти")
        }else{
            const data = new FormData()
            data.append("id", productID)
            if(images!==null){
                for(let file of images){
                    data.append("image", file)
                }
            }
            if(imagesId.length!==0){
                data.append("photosID", imagesId)
            }
            await dispatch(updateProductPhoto(data))
            await toast("Фотографії було оновлено!")
            await dispatch(setSelectMenu("6"))
            await navigate("/admin")
        }
    }

    return(
        <>
        <div className="product_update">
            <h1 className="title">Редагування фотографій</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="product_update__photos">
                    <div className="photos__grid">
                        {props.photos.map(elem=>
                            <ProductPhoto
                            key={elem.id_photo_model}
                            id={elem.id_photo_model}
                            photo={elem.photo_model}
                            callbackPhoto={callbackPhoto}
                            />
                            )}                        
                    </div>
                    <input className="upload_btn" type="file" onChange={e => setImgs(e.target.files)} multiple/><br />
                </div>
                <br />
                <div className="btn">
                    <Save />
                </div>
            </form>
        </div>
        </>
    )
}