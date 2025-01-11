const { Router } = require("express");
const controller = require("../controllers/formsController");
const router = Router();

router.get("/new-product", controller.productFormGet);
router.get("/:id", controller.productFormGet);

module.exports = router; 