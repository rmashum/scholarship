const router = require("express").Router();
const CourseCtrl = require("../controller/CourseController");
//const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAdmin");

//router.post("/delete", auth, authAdmin, userCtrl.deleteUser);

//router.get("/infor", auth, userCtrl.getUser);
//router.get("/history", auth, userCtrl.history);
router.post("/course",CourseCtrl.imageUpload)

module.exports = router;
