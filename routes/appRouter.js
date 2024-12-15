const { Router } = require("express");
const controller = require("../controllers/appController");
const router = Router();

router.get("/", controller.indexPageGet);
router.get("/products", controller.productsGet);
router.post("/products", controller.productsPost);
router.get("/products/:id", controller.productCardGet);
router.delete("/products/:id", controller.productCardDelete);
router.put("/products/:id", controller.productsPost); 
router.get("/forms/new-product", controller.productFormGet);
router.get("/forms/:id", controller.productFormGet);

module.exports = router; 