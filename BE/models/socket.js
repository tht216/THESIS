const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SocketSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },

    socketID: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Socket",
    timestamps: true,
  }
);

module.exports = mongoose.model("Socket", SocketSchema);
