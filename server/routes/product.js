const express = require('express')
const router = express.Router()
const multer = require('multer')

const product = require('../controllers/product')
const checkAdmin = require('../middleware/checkAdmin')

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/product')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname=Date.now().toString()+"_"+file.originalname)
    },
})
const upload = multer({ storage })

//save
router.post('/product', checkAdmin, upload.array('image', 5), product.save)
//show
router.get('/product', product.show)
router.get('/productId:id', product.showTypeId)
router.get('/product:id', product.showID)
router.get('/size:id', product.productSizeId)
//update
// router.patch('/product:id', upload.array('image', 5), product.update)
router.patch('/product:id', checkAdmin, product.update)
router.patch('/product/photo:id', checkAdmin, upload.array('image', 5), product.updatePhoto)
router.patch('/product/size:id', checkAdmin, product.updateSize)
//delete
router.delete('/product:id', checkAdmin, product.delete)
// router.delete('/delete_product:id', checkAdmin, product.deleteProduct)


module.exports = router