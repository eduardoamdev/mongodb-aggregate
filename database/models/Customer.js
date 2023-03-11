const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: String,
    dni: String,
  },
  {
    collection: "customers",
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
