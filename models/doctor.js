const {Schema, model} = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const doctorModel = new Schema({
    name: {type: String , require:true},
    contact: {type: String , require:true},
    email: {type: String , require:true, unique:true} ,
    password: {type: String , require:true},
    dateTime: {type: Date, default: Date.now , require:true},
    nid: {type: String , require:true},
    specialty: {type: String, require: true},
    failedLoginAttempts: {type: Number,default: 0, require: true},
    verified: {type: Boolean, default: false, required: true}
});

doctorModel.plugin(uniqueValidator);

module.exports = model("doctor", doctorModel);