const express = require("express")

const router = express.Router()

const SortedDataController = require("../controllers/SortedData.controller")

router.route("/").post(SortedDataController.getSortedData)

module.exports = router
