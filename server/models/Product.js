const db = require('../database/conection')
const fs = require('fs')

module.exports = class Product{
    constructor(productID, typeID, model, description, discount, cost_min, sizes, image, masId){
        this.productID = productID
        this.typeID = typeID
        this.model = model
        this.description = description
        this.discount = discount
        this.cost_min = cost_min
        this.sizes = sizes
        this.image = image
        this.masId = masId
    }

    static async save(inf, callback){
        db.query('INSERT INTO model(id_type, model) VALUES(?,?)',
        [inf.typeID, inf.model], (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }
        })
        db.query("SELECT LAST_INSERT_ID() INTO @modelID;")
        for(let i=0; i<inf.image.length; i++){
            db.query('INSERT INTO photo_model(id_model, photo_model) VALUES(@modelID, ?)',
            [inf.image[i]], (err)=>{
                if(err){
                    console.log(err)
                    return callback(err)
                }
            })
        }
        db.query("INSERT INTO product_inf(id_model, description, discount, cost_min) VALUES(@modelID, ?,?,?)",
        [inf.description, inf.discount, inf.cost_min], (err)=>{
            if(err){
                console.log(err)
                return callback(err)
            }
        })
        db.query("SELECT LAST_INSERT_ID() INTO @productID;")
        for(let i=0; i<inf.sizes.length; i++){
            let elem = inf.sizes[i]
            db.query("INSERT INTO product(id_product_inf, size, meter) VALUES(@productID,?,?)",
            [elem[0], Number(elem[1])], (err)=>{
                if(err){
                    console.log(err)
                    return callback(err)
                }
            })
        }
        await callback(null)
        
    }

    static show(callback){
        db.query("SELECT id_product_inf, id_type, type, model, discount, cost_min, photo_model FROM product_inf JOIN model USING(id_model) JOIN type USING(id_type) JOIN( SELECT id_model, photo_model FROM photo_model GROUP BY id_model) as `photo` USING(id_model)",
        (err, data)=>{
            if(err){callback(err, null)}
            else{
                callback(null, data)
            }
        })
    }

    static showID(inf, callback){
        let product = []
        db.query('SELECT * FROM product_inf JOIN model USING(id_model) JOIN type USING(id_type) WHERE id_product_inf=?',
        [inf.productID], (err, data)=>{
            if(err){callback(err, null)}
            else{
                product.push(data)
            }
        })
        db.query("SELECT * FROM product WHERE id_product_inf=?",
        [inf.productID], (err, data)=>{
            if(err){callback(err, null)}
            else{
                product.push(data)
            }
        })
        db.query('SELECT id_model FROM product_inf WHERE id_product_inf=? INTO @modelID',
        [inf.productID], (err)=>{
            if(err){callback(err, null)}
        })
        
        db.query('SELECT id_photo_model, photo_model FROM photo_model WHERE id_model=@modelID',
        (err, data)=>{
            if(err){callback(err, null)}
            else{
                product.push(data)
                callback(null, product)
            }
        })
    }

    static showTypeID(inf, callback){
        db.query("SELECT id_product_inf, id_type, type, model, discount, cost_min, photo_model FROM product_inf JOIN model USING(id_model) JOIN type USING(id_type) JOIN( SELECT id_model, photo_model FROM photo_model GROUP BY id_model) as `photo` USING(id_model) WHERE id_type=?",
        [inf.productID],(err, data)=>{
            if(err){
                callback(err, null)
            }else if(data.length == 0){
                return callback(null, "null")
            }else{
                callback(null, data)
            }
        })
    }

    static productSizeId(inf, callback){
        db.query("SELECT id_product, meter, size FROM product WHERE id_product_inf=?",
        [inf.productID], (err, data)=>{
            if(err){callback(err, null)}
            else{
                callback(null, data)
            }
        })
    }

    static update(inf, callback){
        let masModel = [], masObjModel = []
        if(inf.typeID != undefined){
            masObjModel.push("id_type = ?")
            masModel.push(inf.typeID)
        }
        if(inf.model != undefined){
            masObjModel.push(" model = ?")
            masModel.push(inf.model)
        }
        masModel.push(inf.productID)
        if(masObjModel.length>0){
            db.query("SELECT id_model FROM product_inf WHERE id_product_inf=? INTO @midelID",
            [inf.productID])
            db.query(`UPDATE model SET ${masObjModel} WHERE id_model=@midelID`, masModel, (err)=>{
                if(err){callback(err)}
            })
        }
        let masProdAll = [], masObjProdAll = []
        if(inf.cost_min != undefined){
            masObjProdAll.push("cost_min = ?")
            masProdAll.push(inf.cost_min)
        }
        if(inf.description != undefined){
            masObjProdAll.push(" description = ?")
            masProdAll.push(inf.description)
        }
        if(inf.discount != undefined){
            masObjProdAll.push(" discount = ?")
            masProdAll.push(inf.discount)
        }
        masProdAll.push(inf.productID)
        if(masObjProdAll.length>0){
            db.query(`UPDATE product_inf SET ${masObjProdAll} WHERE id_product_inf=?`,
            masProdAll, (err)=>{
                if(err){callback(err)}
            })
        }
        callback(null)
    }

    static async updatePhoto(inf, callback){
        if(inf.masId!==undefined){
            for(let i=0; i<inf.masId.length; i++){
                db.query('SELECT photo_model FROM photo_model WHERE id_photo_model=?',
                [inf.masId[i]], (err, data)=>{
                    if(err){
                        console.log(err)
                        callback(err)
                    }else{
                        try {
                            for(let i=0; i<data.length; i++){
                                fs.unlinkSync(data[i].photo_model)
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })
                db.query("DELETE FROM photo_model WHERE id_photo_model=?",
                [inf.masId[i]],(err)=>{
                    if(err){console.log(err)
                        return callback(err)}
                })
            }
        }
        db.query("SELECT id_model FROM product_inf WHERE id_product_inf=? INTO @modelID;",
        [inf.productID])
        if(inf.image.length!==0){
            for(let i=0; i<inf.image.length; i++){
                db.query('INSERT INTO photo_model(id_model, photo_model) VALUES(@modelID, ?)',
                [inf.image[i]], (err)=>{
                    if(err){
                        console.log(err)
                        return callback(err)
                    }
                })
            }
        }
        await callback(null)
    }

    static async updateSize(inf, callback){
        if(inf.sizes.length!==0){
            for(let i=0; i<inf.sizes.length; i++){
                let elem = inf.sizes[i]
                db.query("INSERT INTO product(id_product_inf, size, meter) VALUES(?,?,?)",
                [inf.productID, elem[0], Number(elem[1])], (err)=>{
                    if(err){
                        console.log(err)
                        return callback(err)
                    }
                })
            }
        }
        if(inf.masId.length!==0){
            for(let i=0; i<inf.masId.length; i++){
                db.query("DELETE FROM product WHERE id_product=?",
                [inf.masId[i]], (err)=>{
                    if(err){console.log(err)
                        return callback(err)}
                })
            }
        }
        await callback(null)
    }

    static delete(inf, callback){
        db.query("SELECT id_model FROM product_inf WHERE id_product_inf = ? INTO @modelID",
        [inf.productID], (err)=>{
            if(err){console.log(err)
                callback(err)}
        })
        db.query('SELECT photo_model FROM photo_model WHERE id_model=@modelID',
        (err, data)=>{
            if(err){
                console.log(err)
                callback(err)
            }else{
                try {
                    for(let i=0; i<data.length; i++){
                        fs.unlinkSync(data[i].photo_model)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            })
        db.query("DELETE FROM photo_model WHERE id_model=@modelID",(err)=>{
            if(err){console.log(err)
                return callback(err)}
        })
        db.query("DELETE FROM product WHERE id_product_inf=?",
        [inf.productID], (err)=>{
            if(err){console.log(err)
                return callback(err)}
        })
        db.query("DELETE FROM product_inf WHERE id_product_inf=?",
        [inf.productID], (err)=>{
            if(err){console.log(err)
                return callback(err)}
        })
        db.query("DELETE FROM model WHERE id_model=@modelID", (err)=>{
            if(err){console.log(err)
                return callback(err)}
            else{callback(null)}
        })
    }

    static deleteProduct(inf, callback){
        db.query("DELETE FROM product WHERE id_product=?",
        [inf.productID], (err)=>{
            if(err){callback(err)}
            else{callback(null)}
        })
    }
}
