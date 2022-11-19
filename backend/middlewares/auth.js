const ErrorHandler = require('../utilites/errorHandler');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('./catchAsyncErrors');
const user = require('../models/user');
exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies
    if(!token){
        next(new ErrorHandler('Login first to access this recourse',401))
    }
    console.log('tokenis ',token);
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next()
})