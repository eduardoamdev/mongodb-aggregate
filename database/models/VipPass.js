const mongoose = require("mongoose");

const vipPassSchema = new mongoose.Schema(
  {
    customerDni: String,
    expirationDate: Date,
  },
  {
    collection: "vip-passes",
  }
);

const VipPass = mongoose.model("VipPass", vipPassSchema);

module.exports = VipPass;
