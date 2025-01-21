const { Router } = require("express");
const controller = require("../controllers/authController");
const router = Router();
const registrationValidator = require("../middleware/registrationValidator");
const loginValidator = require("../middleware/loginValidator");

router.get("/registration", controller.registerPageGet);
router.post("/registration", registrationValidator, controller.registerPagePost);
router.get("/login", controller.loginPageGet);
router.post("/login", loginValidator, controller.loginPagePost);
router.get("/log-out", controller.logoutGet);

module.exports = router;