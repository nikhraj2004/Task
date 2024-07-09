require('dotenv').config()

const passport = require('passport')
const LocalStrategy = require('passport-local')
const express = require('express')
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/connection')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const User = require('./models/userModels')

// Database Connection
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'Feleena is cute cat',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ROUTES HANDLE
app.use('/', userRoutes)
app.use('/tasks', taskRoutes)

// FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
  })
}

app.listen(process.env.PORT, () =>
  console.log(`TaskScheduler Server has started on PORT ${process.env.PORT}`)
)
