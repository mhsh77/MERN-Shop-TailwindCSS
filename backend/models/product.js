const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please enter product name'],
        trim:true,
        maxLength: [100,'Product name cannot exceed 100 char']
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength:[5,'Product price exceed 5 number'],
        default:0.0 
    },
    discription:{
        type: String,
        required: [true, 'Please enter product discription'],
    },
    rating:{
        type: Number,
        default:0.0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum:{
            values: [
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauity/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:'Please select correct category'
            
        }
    },
    seller:{
        type: String,
        required: [true,'Please enter product seller']
    },
    stock:{
        type: Number,
        required: [true,'Please enter product stock'],
        maxLength: [5, 'Product number cannot exceed 500 number'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {    
            name: {
                type: String,
                required:true
            },
            rating: {
                type: Number,
                required:true
            },
            comment: {
                type: String,
                required:true
            },
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Product',productSchema);