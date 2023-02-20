const express = require("express")

const router = express.Router()

const TagController = require("../controllers/Tag.controller")

router.route("/").get(TagController.getTags)
router.route("/").post(TagController.addTags)
router.route("/:id").delete(TagController.deleteTags)

router.route("/packaged-tags").post(TagController.addPackagedRecipeTags)
router.route("/packaged-tags/:recipeId/:tag").delete(TagController.deletePackagedRecipeTags)

router.route("/generic-tags").post(TagController.addGenericRecipeTags)
router.route("/generic-tags/:recipeId/:tag").delete(TagController.deleteGenericRecipeTags)

router.route("/search-tags/:tag").get(TagController.searchTags)

module.exports = router
