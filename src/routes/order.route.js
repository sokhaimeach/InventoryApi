const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { createOrder } = require("../controllers/order.controller");
const router = express.Router();

router.use(protect);

router.post("/", createOrder);

module.exports = router;