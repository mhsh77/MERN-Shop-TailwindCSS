const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')

const errorHandler = require('./middlewares/errors');
const catchAsyncErrors = require('./middlewares/catchAsyncErrors');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//console.log(process.env.JWT_SECRET);

//import routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);
app.get('*',async (req,res,next) => {
    res.status(404).json({
        success:false,
        errMessage:"Route not found"
    })
})
app.use(errorHandler);
app.use(catchAsyncErrors);
module.exports = app