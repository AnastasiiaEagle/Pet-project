const TypeAdditional = require('../models/Type_Additional')

exports.save = async(req, res)=>{
    const rb = req.body
    const type = new TypeAdditional(null, rb.type)
    await TypeAdditional.save(type, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Збереження пройшло невдало")
            }
            res.status(200).json({message: "Дані було збережено"})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    })
}

exports.show = async(req, res)=>{
    await TypeAdditional.show((err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Виникла помилка")
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    })
}

exports.update = async(req, res)=>{
    const rb = req.body
    const id = Number(req.params.id.replace(':', ''))
    const type = new TypeAdditional(id, rb.type)
    await TypeAdditional.update(type, (err)=>{
        try {
            if(err){
                console.log(err)
                throw new SyntaxError("Оновлення пройшло невдало!!!")
            }
            res.status(200).json({message: "Оновлення пройшло успішно"})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    })
}

exports.delete = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const type = new TypeAdditional(id)
    await TypeAdditional.delete(type, (err)=>{
        try {
            if(err){
                throw new SyntaxError("При видаленні виникла помилка")
            }
            res.status(200).json({message: "Видалення пройшло успішно"})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    })
}