const sendToken = (user,statusCode,res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24* 60 * 1000
        ),
        httpOnly: true,//httpOnly cookie is not accessable in js code

    }

    res.status(statusCode).cookie('token',options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;