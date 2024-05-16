const express = require('express');
const cors = require('cors')
const compression = require('compression');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongoose = require('mongoose')
const path = require('path')

const sopperRouter = require('./Routes/shopperRoute');
const userRouter = require('./Routes/UserRoute')
const cartRouter = require('./Routes/cartRouter')

mongoose.connect('mongodb://localhost:27017/shopper')

const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log('Connected MongoDB')
})

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());



const PORT = process.env.PORT || 8005
app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`)
})



app.use('/shopper/product', sopperRouter);
app.use('/shopper/user', userRouter)
app.use('/shopper/cart', cartRouter)