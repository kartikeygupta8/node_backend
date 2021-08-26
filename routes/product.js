const router = require("express").Router();
let Product = require("../models/product.model");

//Add Product
router.route('/addProduct').post(async (req, res) => {
    const name = req.body.name;
    const productDescription = req.body.productDescription;
    const price = req.body.price;
    const newProduct = new Product({name, productDescription, price});
    newProduct.save()
      .then(() => res.end(JSON.stringify({"success" : true, "code" : 201, "message" : "Product Added Successfully"})))
      .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err.message})));
  });

  module.exports = router;