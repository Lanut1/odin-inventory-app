const { Router } = require("express");
const controller = require("../controllers/appController");
const router = Router();

router.get("/", controller.indexPageGet);
router.get("/contacts", controller.contactsPageGet);

module.exports = router; 