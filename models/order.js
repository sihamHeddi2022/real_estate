const mongoose = require("mongoose");
const { User } = require("./user");

const orderSchema = new mongoose.Schema({
  OwnerID: String,
  clientID: String,
  houseID: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
},{timestamps:true});
const Order = mongoose.model("order", orderSchema);

module.exports = {
    Order
};
