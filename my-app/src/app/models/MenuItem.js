import mongoose, {model, models, Schema} from "mongoose";


const MenuItemSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    basePrice: {type: Number},

  }, {timestamps: true});
  

  //first part checks if menuitem model has been defined 
  //second part creates a model if model is not defined
  export const MenuItem = mongoose.models?.MenuItem || mongoose.model('MenuItem', MenuItemSchema);