import {model, models, Schema} from "mongoose";
import mongoose from "mongoose";

const CategorySchema = new Schema({
  name: {type:String, required:true},
}, {timestamps: true});

export const Category = mongoose.models?.Category || mongoose.model('Category', CategorySchema);