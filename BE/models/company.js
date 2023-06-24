const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const CompanySchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Company",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Company", CompanySchema);