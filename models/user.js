const {Schema, model} = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userModel = new Schema({
    name: {type: String , require:true},
    contact: {type: String , require:true},
    email: {type: String , require:true, unique:true} ,
    nid: {type: String , require:true},
    password: {type: String , require:true},
    role: {type: String , require:true},
    dateTime: {type: Date, default: Date.now , require:true},
    verified: {type: Boolean, default: false, required: true}
});

userModel.plugin(uniqueValidator);

module.exports = model("User", userModel);