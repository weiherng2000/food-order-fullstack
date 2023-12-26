import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import { User } from "@/app/models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

         // Add logic here to look up the user from the credentials supplied
        const email = credentials?.email;
        const password = credentials?.password; //note password here is unhashed 

        mongoose.connect(process.env.MONGO_URL);
        //finds first instance of email that matches
        const user = await User.findOne({email});
        //compareSync compares the hashed passwords as comparesync converts the password to a hashed password
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null
      }
    })
  ],
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }