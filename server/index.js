const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

//Middleware
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))

const authRoute = require('./routes/auth')
const woodRoute = require('./routes/wood')
const colorRoute = require('./routes/color')
const typeRoute = require('./routes/type')
const typeAdditionalRoute = require('./routes/type_additional')
const additionalRoute = require('./routes/additional')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

//Constants
const PORT = process.env.PORT || 3001

//Routes
app.use('/api/auth', authRoute)
app.use('/api', woodRoute)
app.use('/api', colorRoute)
app.use('/api', typeRoute)
app.use('/api', typeAdditionalRoute)
app.use('/api', additionalRoute)
app.use('/api', productRoute)
app.use('/api', orderRoute)

app.listen(PORT, ()=>{
    try {
        console.log(`Start server: ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})