const route = require('express').Router()
const {userRegister,userLogin, userEdit, userDelete} = require('../controller/userController')
const user = require('../schema/userSchema')
const auth = require('../validation/auth')
const LoginValidate = require('../validation/LoginValidation')
const userValidate = require('../validation/userValidation')
route.get('/',auth,async (req,res,next)=>{
    const allUser = await user.find();
    res.status(201).json(allUser)
})

route.post('/register',userValidate, userRegister)
route.post('/login',LoginValidate,userLogin)
route.put('/edit/:id',userValidate, userEdit)
route.delete('/delete/:id', userDelete)


module.exports = route

