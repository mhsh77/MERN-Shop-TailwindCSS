const express = require('express');
const router = express.Router();

const {registerUser,
        loginUser,
        logOut,
        forgetPassword,
        resetPass,
        getUserProfile,
        updatePassword,
        updateProfile,
        allUsers,
        getUserDetails,
        updateUser,
        deleteUser
    } = require('../controllers/authController');
const {isAuthenticatedUser,authorizedRoles} = require('../middlewares/auth')
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logOut)
router.route('/password/forgot').post(forgetPassword)
router.route('/password/reset/:token').put(resetPass)
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)

//admin  routes handlng 
router.route('/admin/users').get(isAuthenticatedUser,authorizedRoles('admin'),allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizedRoles('admin'),getUserDetails)
.put(isAuthenticatedUser,authorizedRoles('admin'),updateUser)
.delete(isAuthenticatedUser,authorizedRoles('admin'),deleteUser)
module.exports = router;