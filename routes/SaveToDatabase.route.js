const express = require("express")

const router = express.Router()

const SaveToDatabaseController = require("../controllers/SaveToDatabase.controller")

router.route("/").post(SaveToDatabaseController.SaveToDatabase)

module.exports = router
