const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try{
    const token = req.cookies.crud;
        const verify = jwt.verify(token,process.env.JWT_SIGN)
        if(verify){
            next()
        }else{
            res.json({message:'please login',success:false})
        }
  }
  catch(err){
      res.json({message:'please add token',success:false})
  }
  
};

module.exports = auth;
