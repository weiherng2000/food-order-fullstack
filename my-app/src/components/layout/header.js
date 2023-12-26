'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header(){
    const session = useSession();
    console.log(session);
    //at the start session data is undefined so we add question mark
    const status = session?.status
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' '))
    {
        //get first name only 
        userName = userName.split(' ')[0]
    }
    return(

        <header className="flex items-center justify-between">
            
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-2xl" href = "/">ST PIZZA</Link>
                <Link href = {'/'}>Home</Link>
                <Link href = {''}>Menu</Link>
                <Link href = {''}>About </Link>
                <Link href = {''}>Contact</Link>
             
            </nav>
            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
              {
                 status === 'authenticated' && (
                    <>
                       <Link className = "whitespace-nowrap"href = {'/profile'}>Hello, {userName}</Link>
                       <button 
                        onClick={() =>signOut()}
                        className = "bg-primary text-white px-8 py-2 rounded-full" href = {'/register'}>Logout</button>
                    </>
                    
                 )
              }
              {
                 status === 'unauthenticated' && (
                      <>
                         <Link href = {'/login'}> Login </Link>
                         <Link className = "bg-primary text-white px-8 py-2 rounded-full" href = {'/register'}>Register</Link>
                      </>
                 )
              }
             
            </nav>

        </header>

    );
}