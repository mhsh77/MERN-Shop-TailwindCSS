const express = require('express');
const router = express.Router();



const { getProducts,newProduct,getSingleProduct,updateProduct,deleteProduct }= require('../controllers/productController')

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')


router.route('/products').get(isAuthenticatedUser,authorizedRoles('admin'),getProducts);
router.route('/admin/product/new').post(isAuthenticatedUser,newProduct);
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/update/:id').put(isAuthenticatedUser,updateProduct)
router.route('/admin/product/delete/:id').delete(isAuthenticatedUser,deleteProduct)
module.exports = router;