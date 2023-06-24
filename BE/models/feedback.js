const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FeedbackSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },

    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Feedback",
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
