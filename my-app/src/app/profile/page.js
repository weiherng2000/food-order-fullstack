'use client'
import EditableImage from "@/components/layout/EditableImage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from 'next/navigation'
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const session = useSession();
    const {status} = session;

    const [user,setUser] = useState(null);  
    const [isAdmin,setIsAdmin]  = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
   

    useEffect(() => {
        if (status === 'authenticated') {
          
          //fetch by default GETs info
          fetch('/api/profile').then(response =>{
            response.json().then(data =>{
                setUser(data);
                setIsAdmin(data.admin);
                setProfileFetched(true);
            })
          });
        }
      }, [session, status]);
    

      async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
    
        const savingPromise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
          if (response.ok)
            resolve()
          else
            reject();
        });
    
        await toast.promise(savingPromise, {
          loading: 'Saving...',
          success: 'Profile saved!',
          error: 'Error',
        });
    
      }

    
    
    //returns loading text on the screen when page
    if(status === 'loading' || !profileFetched)
    {
        return 'Loading...';
    }
    //redirects user to login page if session status is not authenticated means user havent logged in
    if(status === 'unauthenticated')
    {
        redirect('/login');
    }

 

    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin}/>
          
           
            <div className="max-w-2xl mx-auto mt-8">
              
                <UserForm user = {user} onSave = {handleProfileInfoUpdate}/>
                
            </div> 

        </section>
    );

}