"use strict";

const router = require("express").Router();
const controller = require("./controller/controller");
const authMiddleware = require("./middleware/auth");

router.post("/register", controller.createUser);
router.post("/login", controller.login);
router.get("/review/:drinkId", controller.drinkReviews);
router.post("/review", authMiddleware, controller.postReview);
router.get("/allreviews/", controller.allDrinkReviews);
router.get("/refresh", authMiddleware, controller.refresh);
router.post("/home/profile", authMiddleware, controller.userData);

module.exports = router;
