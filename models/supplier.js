const { Schema, model } = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const supplierModel = new Schema({
  supplierID: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  contact: { type: String, require: true },
  drugsAvailable: { type: String, require: true },
});
supplierModel.plugin(uniqueValidator);

module.exports = model("Supplier", supplierModel);
