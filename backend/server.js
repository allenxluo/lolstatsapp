const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const appRouter = require('./routes/app')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/app', appRouter)

app.listen(port)