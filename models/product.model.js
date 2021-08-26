const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const products = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2

    },
    productDescription:{
        type: String

    },
    price:{
        type: String,
        required: true

    }
},
{
    timestamps: true,
  });

  const Product = mongoose.model('Products', products);

  module.exports = Product;