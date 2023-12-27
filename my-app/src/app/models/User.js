import {model, models, Schema} from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  image: {type: String},
  phone: {type: String},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
}, {timestamps: true});

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);