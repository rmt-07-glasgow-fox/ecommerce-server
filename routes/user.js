const router = require("express").Router();
const { login, register, googleLogin } = require("../controllers/user");

router.post("/login", login);
router.post('/register', register)
router.post('/googleLogin', googleLogin)

module.exports = router;
