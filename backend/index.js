require('dotenv').config()
const cors = require('cors')
const express = require('express');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connect = require('./db/connection');
const { notFound, commonHandler } = require('./middleware/errorhandler');
const userRoute = require('./routes/userRoute')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(userRoute)

// errorhander
app.use(notFound)
app.use(commonHandler)


// db connection
connect()


app.listen(8000, ()=>{
    console.log(`server running successfull`)
})