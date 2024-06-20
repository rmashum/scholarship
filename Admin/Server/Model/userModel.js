const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
      min: 5,
      max: 20,
    },
    lastname: {
      type: String,
      trim: true,
      min: 5,
      max: 20,
    },
    image: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "employee", "admin", "super-admin"],
      default: "user",
    },
    pofilePicture: { type: String },
    phone: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
