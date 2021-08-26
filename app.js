const express = require('express');
const bodyParser= require('body-parser');
const cron = require("node-cron");
const mongoose = require('mongoose'); 
const app = express();
const recurringOrder = require('./routes/recurringOrder');
app.use(express.json()) 

var dbURI='mongodb+srv://admin:tech1234@nodeproject.ixgxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})


const MongoClient = require('mongodb').MongoClient 

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const orderRouter = require('./routes/order');
app.use('/order', orderRouter);

const productRouter = require('./routes/product');
app.use('/product', productRouter);


//This cron job runs every sunday at 8 AM to create recurring order 
cron.schedule("0 8 * * 0", function() {
    recurringOrder.createOrder();;
    
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});