const router = require("express").Router();
let Order = require("../models/order.model");
let User = require("../models/user.model");
let Product = require("../models/product.model");

//Add order
router.route('/addOrder').post(async (req, res) => {

    var user = await User.findOne({ email: req.body.email });
    var product = await Product.findOne({ name: req.body.productName });
    const userId = user._id;
    const productId = product._id;
    const quantity = req.body.quantity;
    const totalAmount = req.body.totalAmount;
    const isRecurring = false;
    
    const newOrder = new Order({userId, productId, quantity, totalAmount, isRecurring});
    newOrder.save()
      .then(() => res.end(JSON.stringify({"success" : true, "code" : 201, "message" : "Order Added Successfully"})))
      .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err.message})));
  });

  module.exports = router;

  //Get user detail with order list

  router.route('/getUserDetail').post(async (req, res) => {

    const body = req.body;
    var user = await User.findOne({ email: body.email });
    var order = await Order.find({ userId: user._id });
    if (user) {
      res.status(200).json({ message: "User details : "+ user + "Order details : "+ order });
      
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });

  router.route('/getOrders').post(async (req, res) => {

    const month = req.body.month;
    const year = req.body.year;
    var sortedOrder = await Order.find({});
    sortedOrder = [];
    var orders = await Order.find({});
    for (var i=0; i<orders.length;i++) {
      if(orders[i].createdAt.getMonth() == month){
        if(orders[i].createdAt.getFullYear() == year){
          sortedOrder =sortedOrder+ orders[i];
        }
      }
    }
    if (sortedOrder) {
      res.status(200).json({ message: "Order details :  "+ sortedOrder });
      
    } else {
      res.status(401).json({ error: "Order does not exist" });
    }
  });

  router.route('/getRecurringOrder').post(async (req, res) => {
    const email = req.body.email;
    var length = 0;
    var user = await User.findOne({ email: email });
    var recurringOrder = await Order.find({});
    recurringOrder = [];
    var orders = await Order.find({});
    for (var i=0; i<orders.length;i++) {
      if(orders[i].userId == user._id){
        if(orders[i].isRecurring == true){
          recurringOrder =recurringOrder+ orders[i];
          length = length + 1;
        }
      }
    }
    if (recurringOrder) {
      res.status(200).json({ message: "There are "+length+" recurring order  " + "  Recurring Order details :  "+ recurringOrder });
      
    } else {
      res.status(401).json({ error: "Order does not exist" });
    }
  });