'use client';
//this file allows us to use sessionprovider and usesession for our components
import { SessionProvider } from "next-auth/react";

export function AppProvider({children}){
    return(
        <SessionProvider>{children}</SessionProvider>
    );
}