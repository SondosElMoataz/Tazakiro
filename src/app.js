const express = require('express')
const webpush = require("web-push");
const cors = require('cors')
require('./db/mongoose')

// const userRouter = require('./routers/user')


const app = express()
app.use(cors());

app.use(express.json())




// app.use('/api/v1/users', userRouter)



// app.use(taskRouter)
module.exports = app
