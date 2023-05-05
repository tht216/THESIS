const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const CollectionSchema = new Schema(
  {
    pickupID: {
      type: Schema.Types.ObjectId,
      ref: "pickup",
      index: true,
      required: [true, "Pickup is required"]
    },
    serviceType: { type: String, required: [true, "Service Type is required"], ref: "pickup" },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
  },
  {
    collection: "Collection",
    timestamps: true,
  }
);
mongoose.set("runValidators", true);
ServiceSchema.index({ pickupID: 1, serviceType: -1 }, { unique: true });
module.exports = mongoose.model("Collection", CollectionSchema);
