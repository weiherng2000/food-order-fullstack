import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

//POST is a standard function in next 14 
export async function POST(req) {

    const {name} = await req.json();
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
  
    
}
//put is to update or edit our catgeories
export async function PUT(req) {

    const {_id,name} = await req.json();
    await Category.updateOne({_id},{name});
    return Response.json(true);
  
    
}

export async function GET(){

    return Response.json(await Category.find());

}