const jwt = require("jsonwebtoken");
require('dotenv').config()

//Constants
const KEY = process.env.KEY

const checkAuth=(req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"]
    if(token){
        try {
            const decoded = jwt.verify(token, KEY)
            req.ID = decoded.userID
            req.role = decoded.role
            return next()
        } catch (error) {
            return res.json({
                message: "Немає доступу"
            })
        }
    }else{
        return res.json({
            message: "Немає доступу ("
        })
    }
}

module.exports = checkAuth