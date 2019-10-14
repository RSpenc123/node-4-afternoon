require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const {SERVER_PORT,SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swag = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

app.use(express.json())

app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    
}))
app.use(checkForSession)

app.get('/api/swag', swag.read)
app.post('./api/login', authController.login)
app.post('./api/register', authController.register)
app.post('./api/signout', authController.signout)
app.get('./api/user', authController.getUser)
app.post('./api/cart/checkout', cartController.checkout)
app.post('./api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)
app.get('./app/search', searchController.search)


const port = SERVER_PORT
app.listen(port, () => console.log('we up'))