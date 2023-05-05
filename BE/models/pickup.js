const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { STATUS } = require("../constant");
const PickupSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customer",
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.RECEIVED,
    },
    date: {
      type: Date,
    },
    long: {
      type: Number,
      required: [true, "Longtitude is required"],
    },
    lat: {
      type: Number,
      required: [true, "Latitude is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    isMissed: {
      type: Boolean,
      required: [true, "Missing status is required"],
      default: false,
    },
  },
  {
    collection: "Pickup",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Pickup", PickupSchema);
