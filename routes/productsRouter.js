const { Router } = require("express");
const controller = require("../controllers/productsController");
const router = Router();
const validator = require("../middleware/productValidator");

router.get("/", controller.productsGet);
router.post("/", validator, controller.productsPost);
router.get("/:id", controller.productCardGet);
router.delete("/:id", controller.productCardDelete);
router.put("/:id", validator, controller.productsPost);

module.exports = router; 