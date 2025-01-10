const { Router } = require("express");
const controller = require("../controllers/appController");
const router = Router();
const validator = require("../middleware/productValidator");

router.get("/", controller.indexPageGet);
router.get("/products", controller.productsGet);
router.post("/products", validator, controller.productsPost);
router.get("/products/:id", controller.productCardGet);
router.delete("/products/:id", controller.productCardDelete);
router.put("/products/:id", validator, controller.productsPost); 
router.get("/forms/new-product", controller.productFormGet);
router.get("/forms/:id", controller.productFormGet);

module.exports = router; 