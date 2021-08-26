const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  email : {
      type : String,
      required : true,
      unique : true
  },
  contactNumber : {
     type : Number,
     required : true,
     minlength : 10,
     maxlength : 10
  },
  password : {
    type : String,
    required : true,
    minlength : 5
 }

}, {
  timestamps: true,
});

const User = mongoose.model('Users', Users);

module.exports = User;
