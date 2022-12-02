const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utilites/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utilites/jwtTokens');
const sendEmail = require('../utilites/sendEmail')
const crypto = require('crypto');

exports.newOrder = catchAsyncErrors( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        payedAt: Date.now(),
        user: req.user._id
    })
    //console.log(order);
    res.status(200).json({
        success:true,
        order
    })
})

//get single order
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        return next(new ErrorHandler('No order found wiht this id',404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//get single order
exports.myOrders = catchAsyncErrors( async (req, res, next) => {
    const orders = await Order.find({user:req.user.id})
    if(!orders){
        return next(new ErrorHandler('No order found wiht this id',404))
    }

    res.status(200).json({
        success:true,
        orders
    })
})