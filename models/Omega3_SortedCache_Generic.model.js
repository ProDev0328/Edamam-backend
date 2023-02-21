const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const omega3GenericSchema = new Schema({
  foodCategory: {
    type: String,
    default: ''
  },
  label: {
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
}, { timestamps: true });

module.exports = mongoose.model("Omega3Generic", omega3GenericSchema);
