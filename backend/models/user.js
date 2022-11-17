const mongoose = require('mongoose');
const validatior = require('validatior');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide a name'],
        maxLength: [30,'Your name cannot be longer than 30 characters']
    },
    email: {
        type: String,
        required: [true,'Please provide an email address'],
        unique: true,
        validate: [validatior.isEmail,'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true,'Please provide a password'],
        minlength: [6,'Your password must be at least 6 characters']
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
    
        },
        url:{
            type: String,
            required: true

        }
    },
    role:{
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    resetPasswordToken: String,
    resetPasswordTokenExpires:Date

    
})

module.exports = mongoose.model('User', userSchema);