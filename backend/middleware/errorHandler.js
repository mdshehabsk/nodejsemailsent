const httpError = require('http-errors')

const notFound = (req,res,next) =>{
    next(httpError(404, 'your requested route is not found'))
}

const commonError = (err,req,res,next) =>{
    if(res.headersSent){
        next('there was an error')
    }
    else{
        if(err){
            res.send(err.message)
        }else{
            res.send('error happend')
        }
    }
}

module.exports = {
    notFound,
    commonError
}