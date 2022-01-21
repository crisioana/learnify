const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const socketServer = require('./socketServer')

dotenv.config({
  path: './config/.env'
})

const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socketServer(socket)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/v1/auth', require('./routes/auth.route'))
app.use('/api/v1/class', require('./routes/class.route'))
app.use('/api/v1/quiz', require('./routes/quiz.route'))
app.use('/api/v1/category', require('./routes/category.route'))
app.use('/api/v1/result', require('./routes/result.route'))
app.use('/api/v1/dashboard', require('./routes/dashboard.route'))
app.use('/api/v1/notification', require('./routes/notification.route'))

connectDB()
http.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))