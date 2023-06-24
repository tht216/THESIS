const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const CustomerSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    point: {
      type: Number,
      required: true,
      default: 0,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Customer",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Customer", CustomerSchema);
