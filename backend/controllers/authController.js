const User = require('../models/user')
const ErrorHandler = require('../utilites/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utilites/jwtTokens');


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