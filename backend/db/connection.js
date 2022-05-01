const mongoose = require('mongoose');


const connect = async ()=>{
     mongoose.connect(process.env.DBURL)
     .then(data=>console.log(`db connect successfull`))
     .catch(err=>console.log(err))
}

module.exports = connect