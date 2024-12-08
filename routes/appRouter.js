const { Router } = require("express");
const controller = require("../controllers/appController");
const router = Router();

router.get("/", controller.indexPageGet);
router.get("/products", controller.productsGet);
router.get("/products/filtered", controller.filteredProductsGet);

module.exports = router;