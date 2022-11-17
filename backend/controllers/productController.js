const Product = require('../models/product')

const ErrorHandler = require('../utilites/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utilites/apifeatures')

exports.newProduct =catchAsyncErrors( async (req,res,next) => {
    const apifeatures = new apifeatures(Product.find(),req.query)
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})

exports.getProducts =catchAsyncErrors( async(req,res,next)=>{
    const resultsPerPage = 4;
    const productCount = await Product.countDocuments();

    const apifeatures = new APIFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultsPerPage)
    const products = await apifeatures.query;
    res.status(200).json({
        success:true,
        count:products.length,
        productCount,
        products
    })
})

exports.getSingleProduct =catchAsyncErrors( async(req,res,next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

exports.updateProduct = catchAsyncErrors( async(req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });
    res.status(200).json({
        success:true,
        product
    })
})
exports.deleteProduct =catchAsyncErrors( async (req,res,next) => {
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    product = await Product.remove();
    return res.status(200).json({
        success:true,
        message:'product deleted successfullly',
    })
})