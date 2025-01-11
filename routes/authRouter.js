const { Router } = require("express");
const controller = require("../controllers/authController");
const router = Router();

router.get("/register", controller.registerPageGet);
router.post("/register", controller.registerPagePost);
router.get("/login", controller.loginPageGet);
router.post("/login", controller.loginPagePost);

module.exports = router;