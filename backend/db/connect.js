const mongoose = require('mongoose')


const DB_PORT = process.env.DB_PORT

exports.connection = async ()=>{
    mongoose.connect(DB_PORT)
    .then(()=>console.log(`db connection successfull`))
    .catch(err=>console.log(err))
}