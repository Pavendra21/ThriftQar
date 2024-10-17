const mongoose = require('mongoose');


const user = new mongoose.Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  phone: { type: Number, required: true, maxLength: 10, minLength: 10 },

  password: { type: String, required: true },

  confirmPassword: { type: String, required: true }


}, { collection: "SignupData" })

const User = mongoose.model('signUpDetails', user)

module.exports = User;