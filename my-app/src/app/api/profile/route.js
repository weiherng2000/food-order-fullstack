import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

//PUTinformation into the mongo db about our user data
export async function PUT(req){
     mongoose.connect(process.env.MONGO_URL);
     const data = await req.json();
     const session = await getServerSession(authOptions);
     const email = session.user.email;
     
  
     await User.updateOne({email},data);
   
  

     return Response.json('true');
}

//GET information from the mongo db about our user data
export async function GET(req) {

   mongoose.connect(process.env.MONGO_URL);
 
   const url = new URL(req.url);
   const _id = url.searchParams.get('_id');
 
   
   const session = await getServerSession(authOptions);
   const email = session?.user?.email;
   
 
   return Response.json(await User.findOne({email}));
 
 }