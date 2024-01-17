const Order = require('../models/Order')

exports.save = async(req, res)=>{
    const rb = req.body
    const order = new Order(null, rb.name, rb.phone, rb.email, rb.address, rb.order)
    await Order.save(order, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Збереження пройшло невдало")
            }
            res.status(200).json("Збереження пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.show = async(req, res)=>{
    await Order.show((err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Вивід пройшов невдало - " +err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })    
}

exports.showID = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const order = new Order(id)
    await Order.showID(order, (err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Вивід пройшов невдало - " +err)
            }
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })    
}

exports.showOrderID = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const order = new Order(id)
    await Order.showOrderID(order, (err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Вивід пройшов невдало - " +err)
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
    const order = new Order(id, null, null, null, null, rb.order)
    await Order.update(order, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Оновлення пройшло невдало - " +err)
            }
            res.status(200).json("Оновлення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

exports.updateStatusCustomer = async(req, res)=>{
    const rb = req.body
    const id = Number(req.params.id.replace(':', ''))
    const order = new Order(id, rb.status)
    await Order.updateStatusCustomer(order, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Оновлення пройшло невдало - " +err)
            }
            res.status(200).json("Оновлення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}
// exports.updateStatusOrder = async(req, res)=>{
//     const rb = req.body
//     const id = Number(req.params.id.replace(':', ''))
//     const order = new Order(id, rb.status)
//     await Order.updateStatusOrder(order, (err)=>{
//         try {
//             if(err){
//                 throw new SyntaxError("Оновлення пройшло невдало - " +err)
//             }
//             res.status(200).json("Оновлення пройшло успішно")
//         } catch (error) {
//             res.status(400).json(error.message)
//         }
//     })
// }

exports.deleteOrder = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const order = new Order(id)
    await Order.deleteOrder(order, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Видалення пройшло невдало - " +err)
            }
            res.status(200).json("Видалення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })  
}

exports.deleteCustomer = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const order = new Order(id)
    await Order.deleteCustomer(order, (err)=>{
        try {
            if(err){
                throw new SyntaxError("Видалення пройшло невдало - " +err)
            }
            res.status(200).json("Видалення пройшло успішно")
        } catch (error) {
            res.status(400).json(error.message)
        }
    })  
}