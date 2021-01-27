const router = require("express").Router()
const UserController = require("../controllers/userController")

router.post("/register", UserController.register)
router.post("/loginUser", UserController.loginUser)
router.post("/loginAdmin", UserController.loginAdmin)

module.exports = router