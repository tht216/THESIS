const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },

    number: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: "Notification",
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
