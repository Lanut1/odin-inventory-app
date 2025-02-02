const { Router } = require("express");
const controller = require("../controllers/productsController");
const router = Router();
const productValidator = require("../middleware/productValidator");
const reviewValidator = require("../middleware/reviewValidator");

router.get("/", controller.productsGet);
router.post("/", productValidator, controller.productsPost);
router.get("/:id", controller.productCardGet);
router.delete("/:id", controller.productCardDelete);
router.put("/:id", productValidator, controller.productsPost);
router.post("/:id/reviews", reviewValidator, controller.productReviewPost);
router.delete("/:productID/reviews/:reviewID", controller.productReviewDelete);

module.exports = router; 