const mongoose = require("mongoose");

const CommunicationModal = new mongoose.Schema(
  {
    Address: {
      type: String,
      required: true,
      trim: true,
    },
    Pin: {
      type: String,
      trim: true,
    },
    village: {
      type: String,
      trim: true,
    },
    Town: {
      type: String,
      trim: true,
    },
    State: {
      type: String,
      trim: true,
    },
    addressProof: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Communicat", CommunicationModal);
