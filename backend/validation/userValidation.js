const Joi = require("Joi");

const userValidate = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .message("username must be longer than 3 charecter")
      .max(30).message('usename must be shorter than 30 charectar')
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).message('email must be a valid email'),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
    const {value,error} = schema.validate(req.body)
    if(error){
      res.json({
        message:error.details[0].message,
        path:error.details[0].path
      })
    }else{
      next()
    }
    
};

module.exports = userValidate;
