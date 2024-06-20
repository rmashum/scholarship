const router = require("express").Router();
const BankController = require("../controller/BankController");
//const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAdmin");

//router.post("/delete", auth, authAdmin, userCtrl.deleteUser);

//router.get("/infor", auth, userCtrl.getUser);
//router.get("/history", auth, userCtrl.history);
router.post("/course",BankController.imageUpload)

module.exports = router;
