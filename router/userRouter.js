const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth")

router.post("/register",userController.userRegister);
router.get("/login",userController.userLogin);
router.get("/allUser",auth,userController.getAllUser);
router.put("/update/:id",auth,userController.updateUser);
router.delete("/delete/:id",auth,userController.deletUser);

module.exports = router;