const User = require('../models/user')
const ErrorHandler = require('../utilites/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


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
    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })})

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
    const token = user.getJwtToken();
    res.status(200).json({
       success:true,
       token 
    })

})