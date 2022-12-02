const mongoose = require('mongoose');
const validatior = require('validator');
const bycrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { log } = require('console');

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
        minLength: [6,'Your password must be at least 6 characters'],
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
//Encrypting password before saving
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bycrypt.hash(this.password,10)
})
userSchema.methods.compareUserPassword = async function (enteredpassword) {
    return await bycrypt.compare(enteredpassword, this.password)

}
// Return JWT token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_SECRET_EXPIR

    })
}
userSchema.methods.getResetPasswordToken = function (){
    //generate token
    const resetToken = crypto.randomBytes(5).toString('hex')
    console.log('reset token is: ',resetToken)
    // Hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log('hashed reset token is: ',this.resetPasswordToken)
    // set token expire Time
    this.resetPasswordTokenExpires = Date.now() + 30 * 60 * 1000
    return resetToken
}
module.exports = mongoose.model('User', userSchema);