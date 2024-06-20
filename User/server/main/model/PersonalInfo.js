const mongoose = require("mongoose");

const PersonalInformation = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    Gender: {
      type: String,
      trim: true,
    },
    Category: {
      type: String,
      trim: true,
    },
    maritalStatus: {
      type: String,
      trim: true,
    },
    email: {
        type: String,
        trim: true,
      },
      mobile: {
        type: String,
        trim: true,
      },
      annualIncome: {
        type: String,
        trim: true,
      },
    incomeCertificate: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("personalInfo", PersonalInformation);
