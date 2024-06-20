const { models } = require("mongoose");
const Users = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    //Get user information by id
    console.log("authAdmin", req.user);
    const user = await Users.findOne({ _id: req.user.id });
    console.log("USER AUTHADMIN", user);

    if (user.role === "user") {
      return res.status(400).json({ msg: "Admin resources access denied" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
