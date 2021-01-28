const router = require('express').Router()
const bannerController = require("../controllers/bannerController")
const {authorization} = require("../middlewares/auth")

router.get("/banners/:id", bannerController.getBanner)
router.post("/banners", authorization, bannerController.create)
router.put("/banners/:id/edit", authorization, bannerController.editBanner)
router.delete("/banners/:id/delete", authorization, bannerController.deleteBanner)

module.exports = router