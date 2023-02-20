const express = require("express")
const router = express.Router()

const SaveToDatabaseRoute = require("./SaveToDatabase.route")
const FoodRoute = require("./Food.route")
const TagRoute = require("./Tag.route")
const SortedDataRoute = require("./SortedData.route")
// const { isValidToken } = require("../middlewares/Auth.middleware")

router.use('/saveToDatabase', SaveToDatabaseRoute)
router.use('/food-database', FoodRoute)
router.use('/tags', TagRoute)
router.use('/sorted-food-database', SortedDataRoute)


module.exports = router