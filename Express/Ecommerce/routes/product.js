const express = require("express");
const router = express.Router();
const { index, store, update, remove, updateReview } = require('../controller/product')
const { authenticate, checkRole, isBuyer } = require("../middleware/auth")
const uploadImage = require('../middleware/multer')


router.get("", index)
router.post("", authenticate, checkRole, uploadImage, store)
router.put("/:id", authenticate, checkRole, uploadImage, update)
router.delete("/:id", authenticate, checkRole, remove)
router.put("/:id/reviews", authenticate, isBuyer, updateReview)


module.exports = router;
