const User = require('../models/user')
const ErrorHandler = require('../utilites/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utilites/jwtTokens');
const sendEmail = require('../utilites/sendEmail')
const crypto = require('crypto');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'rima',
            url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/05/anime-eye-abilities-featured-image.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5'
        }
    })
    sendToken(user,200,res)
})
exports.loginUser = catchAsyncErrors( async (req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }


    const user = await User.findOne({
        email,
    }).select('+password')
    if(!user){
        return next(new ErrorHandler('User not found',401))

    }
    //check if password is correct or not
    const isPasswordCorrect = await user.compareUserPassword(password);
    if(!isPasswordCorrect){
        return next(new ErrorHandler('Incorrect password',401))

    }
    sendToken(user,200,res)

})
exports.logOut = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true,

    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully'

    })
})
exports.resetPass = catchAsyncErrors( async (req, res, next) => {
    console.log('token from request', req.params.token);
    
    const resetPasswordToken =crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log('resetPasswordToken', resetPasswordToken)
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpires:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))

    }
    if (req.body.password !== req.body.confirmPassword){
        return next( new ErrorHandler('Password dosent match',400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpires = undefined

    await user.save();

    sendToken(user,200,res)
})

exports.forgetPassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findOne({email:req.body.email});
    
    if(!user){
        return next(new ErrorHandler('User not found with this email',404));
    
    }
    // Get reset Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `your message reset token is as follow:\n\n${resetUrl}\n\n if you have not requested this email,then ignore it.`
    try {
        await sendEmail({
            email:user.email,
            subject: 'shopit pass recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to: ${user.email}`,
            msg:message
        })
    } catch (error) {
        //user.resetPasswordToken = undefined
        //user.resetPasswordTokenExpires = undefined
        //await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error,message,500))
    }
})