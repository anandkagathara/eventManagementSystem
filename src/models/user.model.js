const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date,required:false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'],required:false },
  profilePhotoUrl: { type: String ,required:false ,default:null},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;