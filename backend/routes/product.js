const express = require('express');
const router = express.Router();



const { getProducts,newProduct,getSingleProduct,updateProduct,deleteProduct }= require('../controllers/productController')

const {isAuthenticatedUser} = require('../middlewares/auth')


router.route('/products').get(isAuthenticatedUser,getProducts);
router.route('/admin/product/new').post(newProduct);
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/update/:id').put(updateProduct)
router.route('/admin/product/delete/:id').delete(deleteProduct)
module.exports = router;