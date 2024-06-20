const Users = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  deleteUser: async (req, res) => {
    try {
      const data = req.body;
      console.log("DATAA   ", data);
      const returndata = await Users.findByIdAndDelete(data._id);
      console.log("return delete", returndata);
      res.json("deleted Successfully");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const data = req.body;
      console.log("DATAA   ", data);
      const id = req.body._id;
      const returen = await Users.findByIdAndUpdate(
        { _id: id },
        {
          name: data.name,
          role: data.role,
          phone: data.phone,
          email: data.email,
          image: data.image,
        }
      );
      console.log("Return", returen);
      res.json("update data");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  register: async (req, res) => {

    console.log("Regis   ",req.body)
    try {
      const { name, email, password, phone, image } = req.body;

      const user = await Users.findOne({ email });

      if (user) return res.status(400).json({ msg: "The email already" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password length should be at least 6 character" });
      //Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        phone,
        image,
      });
      //save
      await newUser.save();

      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = refreshAccessToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged Out" });
    } catch (err) {
      return res.json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user)
        return res.status(400).json({ msg: "The email is not exist ." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      //If Login success ,create accesstoken and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = refreshAccessToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      console.log("user req>   ", req.user.id);
      const data = await Users.findById(req.user.id).select("-password");
      console.log("USERS ", data);
      if (!data) return res.status(400).json({ msg: "User does not exists." });
      res.json( data );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserById: async (req, res) => {
    console.log("USER ID >>>>", req.params.id);
    try {
      const user = await Users.findById(req.params.id);
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await Users.find();
      if (!users) return res.status(400).json({ msg: "User does not exists." });

      //below code to map user inside its id :{...user details }
      const userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });

      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });
      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

const refreshAccessToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1m" });
};

module.exports = userCtrl;
