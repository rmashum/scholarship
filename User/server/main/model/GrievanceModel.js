const mongoose = require("mongoose");

const GrievanceModel = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    query: {
      type: String,
      trim: true,
    },
    images: {
      type: Object,
      required: true,
    },
    imageIds: {
      type: Object,
      required: true,
    },
    raiseddate: {
      type: String,
      trim: true,
    },
    closerdate: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grievance", GrievanceModel);
