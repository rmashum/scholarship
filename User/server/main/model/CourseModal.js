const mongoose = require("mongoose");

const CourseModal = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      trim: true,
    },
    InstitutionName: {
      type: String,
      trim: true,
    },
    InstitutionAddress: {
      type: String,
      trim: true,
    },
    fee: {
      type: String,
      trim: true,
    },
    documents: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseModal);
