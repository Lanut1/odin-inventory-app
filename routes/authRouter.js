const { Router } = require("express");
const controller = require("../controllers/authController");
const router = Router();
const validator = require("../middleware/authValidator");

router.get("/register", controller.registerPageGet);
router.post("/register", validator, controller.registerPagePost);
router.get("/login", controller.loginPageGet);
router.post("/login", controller.loginPagePost);

module.exports = router;