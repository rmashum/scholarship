const mongoose = require("mongoose");

const CommunicationModal = new mongoose.Schema(
  {
    AccountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ifsc: {
      type: String,
      trim: true,
    },
    bankName: {
      type: String,
      trim: true,
    },
    nameOnPassbook: {
      type: String,
      trim: true,
    },
    village: {
      type: String,
      trim: true,
    },
    town: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    bandDoc: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Communication", CommunicationModal);
