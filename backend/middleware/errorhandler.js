const httpErrors = require('http-errors')

function notFound (req,res,next){
    next(httpErrors(404,'your requested url is not found'))
}

const commonHandler = (err,req,res,next)=>{
    if(res.headersSent){
        next('there was a problem')
    }else{
        if(err.message){
            res.json({status:err.status,message:err.message})
        }else{
            res.json('this is custom error')
        }
    }
}

module.exports= {
    notFound,
    commonHandler
}