const express = require("express")

const router = express.Router()

const SortedDataController = require("../controllers/SortedData.controller")

router.route("/").get(SortedDataController.getSortedData)

module.exports = router
