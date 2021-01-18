const router = require("express").Router()
const user = require("./user")
// const product = require("./product")

// router.use("/", (req, res) => {
//   res.send("Server Conneted")
// })

router.use("/", user)
// router.use(product)

module.exports = router