const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

router.post("/login-customer", CustomerController.login);
router.post("/register-customer", CustomerController.register);

module.exports = router;
