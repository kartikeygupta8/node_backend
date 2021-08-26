const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orders = new Schema({
    userId: {
        type: String,
        required: true
    },
    productId:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    totalAmount:{
        type: String,
        requires: true
    },
    isRecurring:{
        type: Boolean,
        requires: true
    }
    
},
{
    timestamps: true,

});

const Order = mongoose.model('Orders', orders);

module.exports = Order;
