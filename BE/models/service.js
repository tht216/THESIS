const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { SERVICE } = require("../constant");
const ServiceSchema = new Schema(
  {
    companyID: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    serviceType: {
      type: String,
      enum: SERVICE,
      required: [true, "Service Type is required"],
    },
    requirement: {
      type: String,
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
ServiceSchema.index({ companyID: 1, serviceType: 1 }, { unique: true });
module.exports = mongoose.model("Service", ServiceSchema);
