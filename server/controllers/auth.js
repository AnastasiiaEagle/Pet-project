const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User.js')

//Constants
const KEY = process.env.KEY

//Register user
exports.auth = async(req, res)=>{
    try {
        const rb = req.body
        const salt = bcrypt.genSaltSync(10)
        const password = rb.password
        const user = new User(rb.login, bcrypt.hashSync(password, salt))
        await User.save(user, (err)=>{
            try {
                if(err){
                    throw new SyntaxError("Такий користувач вже існує: "+err)
                }else{
                    res.status(200).json("Користувача збережено успішно")
                }
            } catch (error) {
                res.status(400).json(error.message)
            }
        })
    } catch (error) {
        res.status(400).json("Непередбачувана помилка: "+error)
    }
}
//Find user
exports.findUsers = async(req, res)=>{
    await User.findUsers((err, data)=>{
        try {
            if(err){
                throw new SyntaxError("Сталася помилка")
            }else{
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}
//Login user
exports.login = async(req, res)=>{
    const rb = req.body
    const user = new User(rb.login)
    await User.find(user, (err, data)=>{
        try {
            if(data.length == 0){
                throw new SyntaxError("Ви ввели невірні дані")
            }else if(err){
                throw new SyntaxError(err)
            }
            if(data.length == 1){
                const passwordResult = bcrypt.compareSync(rb.password, data[0].password)
                if(passwordResult){
                    const token = jwt.sign({
                        userID: data[0].id_user,
                        login: data[0].login,
                        role: data[0].role,
                    }, KEY, {expiresIn: 60 * 60})//Час життя токену
                    res.status(200).json({
                        message: "Вас успішно авторизовано",
                        token: token
                    })
                }else{
                    throw new SyntaxError("Ви ввели невірні дані")
                }
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}
//Get Me
exports.getMe = async(req, res)=>{
    try {
        const user = new User(req.ID)
        await User.findID(user, async(err, data)=>{
            if(data.length == 0){
                return res.json({
                    message: "Такого юзера не існує."
                })
            }
            const token = jwt.sign({
                userID: data[0].id_user,
                login: data[0].login,
                role: data[0].role,
            }, KEY, {expiresIn: 60 * 60})

            res.json({
                "token": token,
                "role": req.role
            })
        })
    } catch (error) {
        res.status(400).json("Помилка при авторизації")
    }
}
//Delete user
exports.delete = async(req, res)=>{
    const id = Number(req.params.id.replace(':', ''))
    const user = new User(id)
    await User.delete(user, async(err)=>{
        try {
            if(err){
                throw new SyntaxError(err)
            }else{
                res.status(200).json("Користувача видалено")
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    
    })
}