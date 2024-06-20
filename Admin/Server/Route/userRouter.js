const router = require("express").Router();
const userCtrl = require("../Controller/userCtrl");
//const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAdmin");

router.post("/register", userCtrl.register);
router.get("/refresh_token", userCtrl.refreshToken);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/getall", userCtrl.getAllUser);

router.post("/update", userCtrl.update);

//router.post("/delete", auth, authAdmin, userCtrl.deleteUser);

//router.get("/infor", auth, userCtrl.getUser);
router.get("/info/:id", userCtrl.getUserById);
//router.get("/history", auth, userCtrl.history);

module.exports = router;
