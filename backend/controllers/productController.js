const Product = require('../models/product')

const ErrorHandler = require('../utilites/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utilites/apifeatures')

exports.newProduct =catchAsyncErrors( async (req,res,next) => {
    req.body.user = req.user.id;
    
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

//reviews

exports.createProductReview = catchAsyncErrors( async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    console.log('from body',req.user._id);
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    //console.log('made up review',review)

    const product = await Product.findById(productId)
    //console.log('product from DB',product);
    const isreviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()//every user can only make one comment on a specific product
    )
    //console.log('isreviewed',isreviewed);
    if(isreviewed){
        product.reviews.forEach(review => {
            console.log(review);
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review)
        //console.log("prduct rev",product);
        product.numOfReviews = product.reviews.length 
    }
    product.rating= product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.reviews.lenght
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
})

//get all reviews 
exports.getProductReviews = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//get all reviews 
exports.delReview = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length;
    const ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0)/reviews.lenght
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new: true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
    })
})