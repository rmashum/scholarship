require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const app = express();
// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true
  })
);

app.use("/grievance",require("./main/routes/GrievanceRoute"))
app.use("/course", require("./main/routes/CourseRoute"))
app.use("/personal", require("./main/routes/PersonalRoute"))
app.use("/bank",require("./main/routes/BankRoute"));
app.use("/comm", require("./main/routes/CommunicationRoute"))


//Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDb");
  }
);
app.get("/", (req, res) => {
  res.json({ msg: "Welcome my scholiq world " });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on Port ", PORT);
});
