const jwt = require("jsonwebtoken");
require('dotenv').config()

//Constants
const KEY = process.env.KEY

const verifyTokenManager = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if(!token){
        return res.status(403).send("A token is required for authentication")
    }else if(token){
        try {
            const decoded = jwt.verify(token, KEY)
            if(decoded.role == 'manager'){
                req.user = decoded.role
                return next()
            }else{
                throw new SyntaxError
            }
        } catch (error) {
            return res.status(401).send("Немає доступу (")
        }
    }else{
        return res.json({
            message: "Немає доступу ("
        })
    }
}

module.exports = verifyTokenManager