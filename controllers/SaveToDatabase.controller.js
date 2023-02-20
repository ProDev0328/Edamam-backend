// const Packaged = require("../models/Packaged.model")
// const Generic = require("../models/Generic.model")

// const packagedData = require("../Edamam Sample Data/1.json")
// const genericData = require("../Edamam Sample Data/generic-export-ahara-2023-02-09.json")
exports.SaveToDatabase = async (req, res) => {
  try {
    // for (const item of packagedData) {
    //   const data = new Packaged()
    //   data.UPC = item.UPC
    //   data.foodCategory = item.foodCategory
    //   data.servingsPerContainer = item.servingsPerContainer
    //   data.servings = item.servings
    //   data.label = item.label
    //   data.brand = item.brand
    //   data.foodId = item.foodId
    //   data.image = item.image
    //   data.measures = item.measures
    //   data.ingredients = item.ingredients
    //   data.calories = item.calories
    //   data.totalNutrients = item.totalNutrients
    //   data.totalDaily = item.totalDaily
    //   data.dietLabels = item.dietLabels
    //   data.healthLabels = item.healthLabels
    //   data.cautions = item.cautions
    //   data.contentsLabel = item.contentsLabel
    //   await data.save()
    // }
    // for (const item of genericData) {
    //   const data = new Generic()
    //   data.foodCategory = item.foodCategory
    //   data.label = item.label
    //   data.foodId = item.foodId
    //   data.image = item.image
    //   data.measures = item.measures
    //   data.calories = item.calories
    //   data.totalNutrients = item.totalNutrients
    //   data.totalDaily = item.totalDaily
    //   data.dietLabels = item.dietLabels
    //   data.healthLabels = item.healthLabels
    //   data.cautions = item.cautions
    //   await data.save()
    // }
    res.json({ success: true, message: 'successfully added to database' })  
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}
