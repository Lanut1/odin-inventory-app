const { Router } = require("express");
const controller = require("../controllers/appController");
const router = Router();

router.get("/", controller.indexPageGet);

module.exports = router; 