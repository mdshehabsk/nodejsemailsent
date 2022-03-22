const { userRegister,home } = require('../controller/userController')
const userValidate = require('../validation/userValidation')
const router = require('express').Router()


router.get('/api/v1/home', home)
router.post('/api/v1/register', userValidate,userRegister)






module.exports = router