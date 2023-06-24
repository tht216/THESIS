const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { STATUS } = require("../constant");
const PickupSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    status: {
      type: String,
      enum: STATUS,
      default: STATUS.RECEIVED,
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
    amount: {
      type: Number,
      required: [true, "Number is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    serviceType: {
      type: String,
      required: [true, "Service Type is required"],
    },
    note: { type: String },
    rating: { type: Number },
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
