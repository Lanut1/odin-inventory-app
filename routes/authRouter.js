const { Router } = require("express");
const controller = require("../controllers/authController");
const router = Router();
const registrationValidator = require("../middleware/registrationValidator");
const loginValidator = require("../middleware/loginValidator");

router.get("/register", controller.registerPageGet);
router.post("/register", registrationValidator, controller.registerPagePost);
router.get("/login", controller.loginPageGet);
router.post("/login", loginValidator, controller.loginPagePost);

module.exports = router;