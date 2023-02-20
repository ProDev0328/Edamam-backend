const express = require("express")

const router = express.Router()

const FoodController = require("../controllers/Food.controller")

router.route("/").get(FoodController.findFood)

module.exports = router
