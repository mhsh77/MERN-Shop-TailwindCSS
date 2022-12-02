const express = require('express');
const router = express.Router();

const {registerUser,
        loginUser,
        logOut,
        forgetPassword,
        resetPass,
        getUserProfile,
        updatePassword,
        updateProfile
    } = require('../controllers/authController');
const {isAuthenticatedUser} = require('../middlewares/auth')
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logOut)
router.route('/password/forgot').post(forgetPassword)
router.route('/password/reset/:token').put(resetPass)
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

module.exports = router;