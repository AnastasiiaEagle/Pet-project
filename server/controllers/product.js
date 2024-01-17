const Product = require('../models/Product')

exports.save = async(req, res)=>{
    try {
        const rb=req.body
        let image=[]
        for(let i=0; i<req.files.length; i++){
            image.push('uploads/product/'+req.files[i].originalname)
        }
        let sizes = []
        if(typeof rb.size !== "string"){
            rb.size.forEach(elem => {
                sizes.push(elem.split(','))
            })
        }else{
            sizes.push(rb.size.split(','))
        }
        const product = new Product(null, rb.type, rb.name, rb.description, rb.discount, rb.cost, sizes, image)
        await Product.save(product, (err)=>{
            try {
                if(err){
                    throw new SyntaxError("Збереження пройшло невдало")
                }
                res.status(200).json("Збереження пройшло успішно")
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json("Загрузіть фото "+error)
    }
}

exports.show = async(req, res)=>{
    await Product.show((err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виведення пройшло невдало - " + err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.showID = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const product = new Product(id)
    await Product.showID(product, (err, data)=>{
        try {
            if(err){
                console.log(err)
                throw new SyntaxError("Виведення пройшло невдало  - " + err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.showTypeId = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const product = new Product(id)
    await Product.showTypeID(product, (err, data)=>{
        try {
            if(err){
                console.log(err)
                throw new SyntaxError("Виведення пройшло невдало  - " + err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.productSizeId = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const product = new Product(id)
    await Product.productSizeId(product, (err, data)=>{
        try {
            if(err){
                console.log(err)
                throw new SyntaxError("Виведення пройшло невдало")
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.update = async(req, res)=>{
    try {     
        const id = Number(req.params.id.replace(':', ''))
        const rb = req.body
        // let sizes = []
        // if(rb.sizes != undefined){
        //     if(typeof rb.size !== "string"){
        //         rb.size.forEach(elem => {
        //             sizes.push(elem.split(','))
        //         })
        //     }
        // }
        const product = new Product(id, rb.type, rb.name, rb.description, rb.discount, rb.cost)
        await Product.update(product, (err)=>{
            try {
                if(err){
                    throw new SyntaxError("Помилка при збереженні - "+err)
                }
                res.status(200).json("Збереження пройшло успішно")
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json("Виникли непередбачувані помилки - "+error)
    }
}

exports.updatePhoto = async(req, res)=>{
    try {
        const id = Number(req.params.id.replace(':', ''))
        const rb=req.body
        let image=[]
        if(req.files){
            for(let i=0; i<req.files.length; i++){
                image.push('uploads/product/'+req.files[i].originalname)
            }
        }
        let photosID = []
        if(rb.photosID != undefined){
            photosID.push(rb.photosID.split(','))
        }
        const product = new Product(id, null, null, null, null, null, null, image, photosID[0])
        await Product.updatePhoto(product, (err)=>{
            try {
                if(err){
                    throw new SyntaxError("Помилка при збереженні - "+err)
                }
                res.status(200).json("Збереження пройшло успішно")
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json("Виникли непередбачувані помилки - "+error)
    }
}

exports.updateSize = async(req, res)=>{
    try {
        const id = Number(req.params.id.replace(':', ''))
        const rb=req.body
        let sizes = []
        rb.sizes.map((elem)=>{
            sizes.push(elem.split(','))
        })
        const product = new Product(id, null, null, null, null, null, sizes, null, rb.sizeId)
        await Product.updateSize(product, (err)=>{
            try {
                if(err){
                    throw new SyntaxError("Помилка при збереженні - "+err)
                }
                res.status(200).json("Збереження пройшло успішно")
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const product = new Product(id)
    await Product.delete(product, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Ви не можете видалити продукт, поки на нього є замовлення - " + err)
            }
            res.status(200).json("Видалення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.deleteProduct = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const product = new Product(id)
    await Product.deleteProduct(product, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Ви не можете видалити продукт, поки на нього є замовлення - " + err)
            }
            res.status(200).json("Видалення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}