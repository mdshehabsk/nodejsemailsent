const Joi = require('joi');

const LoginValidate = async (req,res,next)=>{
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).message('email must be a valid email'),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        
    })
    const {value,error} = schema.validate(req.body)
    if(error){
      res.json({
        message:error.details[0].message,
        path:error.details[0].path
      })
    }else{
      next()
    }
}

module.exports = LoginValidate