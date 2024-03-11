const mongoose = require("mongoose");

const DetailsSchema = new mongoose.Schema({
  id: Number,
  phoneNumber: String,
  email: String,
  linkedId: String,
  linkPrecedence: {
    type: String,
    enum: ["secondary", "primary"]
  }},{
    timestamps:true
});

export const User= mongoose.model('User', DetailsSchema)