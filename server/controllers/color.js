const Color = require('../models/Color')

exports.save = async(req, res)=>{
    try {
        const rb = req.body
        const urlPhoto = 'uploads/color/'+req.file.filename
        const color = new Color(null, rb.name, rb.cost, urlPhoto)
        await Color.save(color, (err)=>{
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
    await Color.show((err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виникла помилка - "+err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json()
        }
    })
}

exports.showID = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const color = new Color(id)
    await Color.showID(color, (err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виникла помилка - "+err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json()
        }
    })
}

exports.update = async(req,res)=>{
    const rb = req.body
    const id = Number(req.params.id.replace(':', ''))
    let urlPhoto = undefined
    if(req.file){
        urlPhoto = 'uploads/color/'+req.file.filename
    }
    console.log(urlPhoto)
    const color = new Color(id, rb.name, rb.cost, urlPhoto)
    await Color.update(color, (err)=>{
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
    const color = new Color(id)
    await Color.delete(color, (err)=>{
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