require('dotenv').config()
const cors = require('cors');
const express = require('express')
const { connection } = require('./db/connect')
const { notFound, commonError } = require('./middleware/errorHandler')
const router = require('./router/userRouter')
const app = express()

app.use(cors())
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))
app.use(router)
// db connection
connection ()

// erorr handler
app.get('/', (req,res,next)=>{
    res.send('home ')
})
app.use(notFound)
app.use(commonError)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})