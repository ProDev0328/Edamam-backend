const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const cholinePackagedSchema = new Schema({
  UPC: {
    type: String,
    default: ''
  },
  foodCategory: {
    type: String,
    default: ''
  },
  servingsPerContainer: {
    type: Number,
    default: 0
  },
  servings: {
    type: Array,
    default: []
  },
  label: {
    type: String, 
    default: ''
  },
  brand: { 
    type: String, 
    default: ''
  },
  foodId: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  measures: {
    type: Array,
    default: []
  },
  ingredients: {
    type: Array,
    default: []
  },
  calories: {
    type: Number,
    default: 0
  },
  totalNutrients: {
    type: Array,
    default: []
  },
  totalDaily: {
    type: Array,
    default: []
  },
  dietLabels: {
    type: Array,
    default: []
  },
  healthLabels: {
    type: Array,
    default: []
  },
  aharaTags: {
    type: Array,
    default: []
  },
  cautions: {
    type: Array,
    default: []
  },
  contentsLabel: {
    type: String,
    default: ''
  },
}, { timestamps: true });

module.exports = mongoose.model("CholinePackaged", cholinePackagedSchema);
