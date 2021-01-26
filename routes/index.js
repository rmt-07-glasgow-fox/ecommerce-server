const router = require("express").Router();
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const cartRouter = require("./cartRouter");
const UserController = require("../controllers/UserController");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/loginCMS", UserController.loginCMS);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/carts", cartRouter);
router.use(errorHandler);

module.exports = router;
