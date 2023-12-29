import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

//POST is a standard function in next 14 
export async function POST(req) { 

    mongoose.connect(process.env.MONGO_URL);
    const {name} = await req.json();
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
  
    
}
//put is to update or edit our catgeories
export async function PUT(req) {
    
    mongoose.connect(process.env.MONGO_URL);
    const {_id,name} = await req.json();
    await Category.updateOne({_id},{name});
    return Response.json(true);
  
    
}

export async function GET(){
    
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(await Category.find());

}