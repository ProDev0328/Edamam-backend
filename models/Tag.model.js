const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const TagSchema = new Schema({

  label: {
    type: String,
    default: ''
  },
  description : {
    type: String,
    default: ''
  }
  
}, { timestamps: true });

module.exports = mongoose.model("Tag", TagSchema);
