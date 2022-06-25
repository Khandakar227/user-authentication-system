const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const doctorOrderModel = new Schema({
  doctorName: {type: String , require:true},
  doctorContact: {type: String , require:true},
  doctorID: {type: String , require:true},
  doctorEmail: {type: String , require:true},
  drugId : { type: Array , require: true},
  drugNames : { type: Array , require: true},
  drugPrice: {type: Array , require:true},
  drugQuantity: {type: Array , require:true},
  realQuantity: {type: Array , require:true},
  totalAmount : { type: String , require: true},
  pickupDate : { type: String , require: true}
})
doctorOrderModel.plugin(uniqueValidator);

module.exports = model('DoctorOrder',doctorOrderModel);