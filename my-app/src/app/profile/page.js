'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from 'next/navigation'
import {useEffect, useState} from "react";

export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const [userName,setUserName] = useState('');
    const [saved,setSaved] = useState(false);
    const [isSaving,setIsSaving] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.data.user.name);
        }
      }, [session, status]);
    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile',{
            method:'PUT',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({name:userName}),
        });
        setIsSaving(false);
        if(response.ok)
        {
            setSaved(true);
        }
    }

    async function handleFileChange(ev){
          //there will be a file object in the event
          const files = ev.files;
          if(files?.length > 0)
          {
            const data = new FormData;
            data.set('files',files);
            await fetch('/api/upload',{
                method:'POST',
                body:data,
            })
          }
    }
    
    //returns loading text on the screen when page
    if(status === 'loading')
    {
        return 'Loading...';
    }
    //redirects user to login page if session status is not authenticated means user havent logged in
    if(status === 'unauthenticated')
    {
        redirect('/login');
    }

    const userImage = session.data.user.image;

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
               Profile
            </h1>
           
            <div className="max-w-md mx-auto ">
                {saved && (
                       <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">Profile saved!</h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">
                        Saving...
                    </h2>
                )}
               
                <div className="flex gap-4 items-center">
                    <div className=" p-2 rounded-lg relative" >
                  
                       <Image className= "rounded-lg w-full h-full mb-1"src = {userImage} width = {250} height = {250} alt = {'avatar'}/>
                       <label>
                          <input className= "hidden"type = "file" onChange={handleFileChange}/>
                          <span className="border rounded-lg p-2 block text-center border-gray-300 cursor-pointer">Edit</span>
                       </label>
                       
               
                    </div>
                   
                    <form className="grow" onSubmit = {handleProfileInfoUpdate}>
                        <input type = "text" placeholder="First and last name" value={userName} onChange={ ev => setUserName(ev.target.value)}/>
                        <input type = "email" value = {session.data.user.email} disabled = {true}/>
                        <button type = "submit">Save</button>
                    </form>
                </div>
            </div> 

        </section>
    );

}