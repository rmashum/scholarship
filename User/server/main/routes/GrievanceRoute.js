const router = require("express").Router();
const GrievanceCtrl = require("../controller/GrievanceController");
//const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAdmin");

//router.post("/delete", auth, authAdmin, userCtrl.deleteUser);

//router.get("/infor", auth, userCtrl.getUser);
//router.get("/history", auth, userCtrl.history);
router.get("/get", GrievanceCtrl.getGrievance);
router.post("/save", GrievanceCtrl.addGrievance);
router.post("/upload",GrievanceCtrl.imageUpload)

module.exports = router;
