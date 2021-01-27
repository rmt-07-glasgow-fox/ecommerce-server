const router = require("express").Router()
const OrderController = require("../controllers/orderController")
const { userAuthorizationSingle } = require("../middlewares/auth")

router.post("/orders", OrderController.createOrder)
router.post("/receipt", OrderController.sendReceipt)

router.get("/orders", OrderController.getAllOrder)
router.get("/orders/:orderId", userAuthorizationSingle, OrderController.getOneOrder)
router.patch("/orders/:orderId", userAuthorizationSingle, OrderController.patchOrder)
router.delete("/orders/:orderId", userAuthorizationSingle, OrderController.deleteOrder)
router.delete("/orders", OrderController.deleteAllOrder)

module.exports = router