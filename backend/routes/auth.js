const express = require('express');
const router = express.Router();

const {registerUser, loginUser, logOut, forgetPassword, resetPass} = require('../controllers/authController');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logOut)
router.route('/password/forgot').post(forgetPassword)
router.route('/password/reset/:token').put(resetPass)
module.exports = router;