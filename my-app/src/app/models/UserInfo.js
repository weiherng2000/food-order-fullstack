import {model, models, Schema} from "mongoose";
import mongoose from "mongoose";

const UserInfoSchema = new Schema({
  email: {type: String, required: true},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  phone: {type: String},
  admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = mongoose.models?.UserInfo || mongoose.model('UserInfo', UserInfoSchema);