"use strict";

const router = require("express").Router();
const controller = require("./controller/controller");

router.post("/", controller.createUser);
router.get("/", controller.users);
router.get("/review/:drinkId", controller.drinkReviews);
router.post("/review", controller.postReview);

module.exports = router;
