"use strict";

const router = require("express").Router();
const controller = require("./controller/controller");
const authMiddleware = require("./middleware/auth");

router.post("/", controller.createUser);
router.get("/", controller.users);
router.post("/login", controller.login);
router.get("/review/:drinkId", controller.drinkReviews);
router.post("/review", authMiddleware, controller.postReview);

module.exports = router;
