const Additional = require('../models/Additional')

exports.save = async(req, res)=>{
    const rb = req.body
    const urlPhoto = 'uploads/additional/'+req.file.filename
    const additional = new Additional(null, rb.id_type, rb.name, urlPhoto, rb.cost, Boolean(rb.presence))
    await Additional.save(additional, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Збереження пройшло невдало - "+err)
            }
            res.status(200).json("Дані було збережено")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.show = async(req, res)=>{
    await Additional.show((err, data)=>{
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

exports.showId = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const additional = new Additional(id)
    await Additional.showID(additional, (err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виникла помилка")
            }
            if(data=="null"){
                res.status(200).json({"message": "null"})

            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.update = async(req, res)=>{
    try {
        const rb = req.body
        const id = Number(req.params.id.replace(':', ''))
        let urlPhoto = undefined
        if(req.file){
             urlPhoto = 'uploads/additional/'+req.file.filename
        }
        const additional = new Additional(id, rb.id_type, rb.name, urlPhoto, rb.cost)
        await Additional.update(additional, (err)=>{
            try {
                if(err){
                    console.log(err)
                    throw new SyntaxError("Оновлення пройшло невдало!!!")
                }
                res.status(200).json("Оновлення пройшло успішно")
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        res.status(400).json("Загрузіть фото")
    }
}

exports.delete = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const additional = new Additional(id)
    await Additional.delete(additional, (err)=>{
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