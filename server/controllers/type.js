const Type = require('../models/Type')

exports.save = async(req, res)=>{
    const rb = req.body
    const type = new Type(null, rb.type)
    await Type.save(type, (err)=>{
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
    await Type.show((err, data)=>{
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

exports.update = async(req, res)=>{
    const rb = req.body
    const id = Number(req.params.id.replace(':', ''))
    const type = new Type(id, rb.type)
    await Type.update(type, (err)=>{
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
    const type = new Type(id)
    await Type.delete(type, (err)=>{
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