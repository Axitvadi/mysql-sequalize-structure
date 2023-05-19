const express = require("express");
const router = express.Router();

const user = require("./userRouter");
const product = require("./productRouter");

router.use("/", user);
router.use("/products",product);

module.exports = router;