const express = require('express')
const webpush = require("web-push");
const cors = require('cors')
require('./db/mongoose')

const matchRouter = require('./routers/match')
const stadiumRouter = require('./routers/stadium')
const userRouter = require('./routers/user')
const reservationRouter = require('./routers/reservation')


const app = express()
app.use(cors());
app.use(express.json())




app.use('/match', matchRouter)
app.use('/stadium', stadiumRouter)
app.use('/user', userRouter)
app.use('/reservation',reservationRouter)


module.exports = app
