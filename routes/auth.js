const bcrypt = require("bcrypt");
const router = require('express').Router();
let User = require('../models/user.model');

//signUp
router.route('/signup').post(async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const password = req.body.password;
  
    const newUser = new User({firstName, lastName, email, contactNumber, password});
  
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.save()
      .then(() => res.end(JSON.stringify({"success" : true, "code" : 201, "message" : "User Added Successfully"})))
      .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err.message})));
  });

  // login route
  router.post("/login", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });

  module.exports = router;

  // Reset password
  
  router.post("/resetPassword", async (req, res) => {
    const body = req.body;
    var user = await User.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const salt = await bcrypt.genSalt(10);
        user= await User.updateOne(
            { email: body.email },
            { $set: { password: await bcrypt.hash(req.body.newPassword, salt)} },
            { new: true }
          )
          .then(() => res.end(JSON.stringify({"success" : true, "code" : 201, "message" : "Password changed Successfully"})))
          .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err.message})));
        
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });

  // Forget Password

  router.post("/forgetPassword", async (req, res) => {
    const body = req.body;
    var user = await User.findOne({email: body.email});
    if(user){

        if(body.contactNumber=user.contactNumber){

            const salt = await bcrypt.genSalt(10);
            user = await User.updateOne(
                { email: body.email },
                { $set: { password: await bcrypt.hash(req.body.newPassword, salt)} },
                { new: true }
              )
              .then(() => res.end(JSON.stringify({"success" : true, "code" : 201, "message" : "Password changed Successfully"})))
              .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err.message})));
            
          } else {
            res.status(400).json({ error: "Invalid Password" });
          }
        } else {
          res.status(401).json({ error: "User does not exist" });
        }
      });