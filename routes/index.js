const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const UserController = require("../controllers/UserController");
const errorHandler = require("../middlewares/errorHandler");
const { authenticate } = require("../middlewares/auth");

// router.post("/register", UserController.register) // via seeder
router.post("/login", UserController.login);
router.use(authenticate);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

router.use(errorHandler);

module.exports = router;
