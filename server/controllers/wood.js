const Wood = require('../models/Wood')

exports.save = async(req, res)=>{
    try {
        const rb = req.body
        const urlPhoto = 'uploads/wood/'+req.file.filename
        const wood = new Wood(null, rb.name, rb.cost, urlPhoto)
        console.log(wood)
        await Wood.save(wood, (err)=>{
            try {
                if(err){
                    throw new SyntaxError("Збереження пройшло невдало - "+err)
                }
                res.status(200).json("Дані було збережено")
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        res.status(400).json("Загрузіть фото")
    }
}

exports.show = async(req, res)=>{
    await Wood.show((err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виникла помилка")
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.showID = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const wood = new Wood(id)
    await Wood.showID(wood, (err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виникла помилка - "+err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.updata = async(req,res)=>{
    const rb = req.body
    const id = Number(req.params.id.replace(':', ''))
    let urlPhoto = undefined
    if(req.file){
        urlPhoto = 'uploads/wood/'+req.file.filename
    }
    const wood = new Wood(id, rb.name, rb.cost, urlPhoto)
    await Wood.update(wood, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Оновлення пройшло невдало...")
            }
            res.status(200).json("Оновлення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.delete = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const wood = new Wood(id)
    await Wood.delete(wood, (err)=>{
        try {
            if(err){
                throw new SyntaxError("При видаленні виникла помилка")
            }
            res.status(200).json("Видалення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}