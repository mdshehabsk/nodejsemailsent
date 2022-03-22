const Joi = require("joi");
const userValidate = async (req, res, next) => {
  const Schema = Joi.object({
    username: Joi.string()
      .min(3)
      .message("username must be bigger than 3")
      .max(15)
      .message("usernaem must be shorter than 15"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .message("must have two domain parts"),
    phone: Joi.string()
      .length(11)
      .message("number must be 11 charectar ")
      .pattern(/^[0-9]+$/)
      .message("number should be number"),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { error, value } = Schema.validate(req.body);
  let details;
  if (error) {
    details = error.details[0].message;
  }
  if (!details) {
    next();
  }
  if(details){
    res.json({message:details,success:false})
  }
};

module.exports = userValidate;
