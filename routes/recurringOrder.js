let Order = require("../models/order.model");
let User = require("../models/user.model");
let Product = require("../models/product.model");

async function createOrder() {
    var users = await User.find({});
    var product= await Product.findOne({});
    const isRecurring = true;
        for (var i=0; i<users.length;i++) {
          const newOrder = new Order({"userId" : users[i]._id , "productId" : product._id, "quantity": 1, "totalAmount": product.price, "isRecurring": isRecurring});
          newOrder.save();
        }
        console.log('Recurring Order placed');
      };
  


  module.exports.createOrder = createOrder;