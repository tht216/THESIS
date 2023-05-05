const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const ServiceSchema = new Schema(
  {
    companyID: {
      type: Schema.Types.ObjectId,
      ref: "company",
      index: true,
      required: [true, "Company is required"]
    },
    serviceType: { type: String, required: [true, "Name is required"], index: true },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    requirement: {
      type: String,
      required: [true, "Requirement is required"],
    },
    price: {
      type: Number,
      required: [true, "Price time is required"],
    },
  },
  {
    collection: "Service",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
ServiceSchema.index({ companyID: 1, serviceType: -1 }, { unique: true });
module.exports = mongoose.model("Service", ServiceSchema);
