const express = require('express')
const router = express.Router()

const order = require('../controllers/order')
const checkManager = require('../middleware/checkManager')


//save
router.post('/order', order.save)
//show
router.get('/customer', order.show)
router.get('/allorder:id', order.showID)
router.get('/order:id', order.showOrderID)
//update
router.patch('/order:id', checkManager, order.update)
// router.patch('/status_order:id', order.updateStatusOrder)
router.patch('/status_customer:id', checkManager, order.updateStatusCustomer)

//delete
router.delete('/order:id', checkManager, order.deleteOrder)
router.delete('/customer:id', checkManager, order.deleteCustomer)


module.exports = router