const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new Schema(
  {
    isPaid: {
      type: Boolean,
      default: false,
      required: [true, "Payment Status is required"],
    },
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "pickup",
    },
    price: {
      type: Number,
      required: [true, "Price is required"]
    }
  },
  {
    collection: "Payment",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
module.exports = mongoose.model("Payment", PaymentSchema);
