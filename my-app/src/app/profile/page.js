'use client'
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
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

    const [image,setImage] = useState('');
    const [userName,setUserName] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    const [isAdmin,setIsAdmin]  = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
   

    useEffect(() => {
        if (status === 'authenticated') {
          setUserName(session.data.user.name);
          setImage(session.data.user.image);
          //fetch by default GETs info
          fetch('/api/profile').then(response =>{
            response.json().then(data =>{
                setPhone(data.phone);
                setStreetAddress(data.streetAddress);
                setPostalCode(data.postalCode);
                setCity(data.city);
                setCountry(data.country);
                setIsAdmin(data.admin);
                setProfileFetched(true);
            })
          });
        }
      }, [session, status]);
    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
      
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({name:userName,image,streetAddress,phone,postalCode,city,country}),
            });
            if (response.ok)
              resolve()
            else
              reject();
          });
          
          //toast is a react library which allows us to have pop up alert styled boxes
          await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
          });
        
       
    }

    async function handleFileChange(ev){
          //there will be a file object in the event
          const files = ev.target.files;
          if(files?.length === 1)
          {
            const data = new FormData;
            data.set('file',files[0]);


            const uploadPromise = fetch('/api/upload',{
                method:'POST',
                body:data,
            }).then(response => {

                if(response.ok)
                {
                    return response.json().then( link => {
                        setImage(link);
            
                    })
                        
                    
                }
                throw new Error('Something went wrong! ');

            
                })
                   
              
            
            await toast.promise(uploadPromise,{
                loading:'Uploading...',
                success:'Upload complete',
                error:'Upload error',
            });
         
     
          }
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
          
           
            <div className="max-w-md mx-auto mt-8">
              
                
                <div className="flex gap-4 ">
                    <div className=" p-2 rounded-lg relative max-w-[120px] max-h-[120px]" >
                        {
                            image && ( <Image className= "rounded-lg w-full h-full mb-1"src = {image} width = {250} height = {250} alt = {'avatar'}/>)
                        }
                  
                      
                       <label>
                          <input className= "hidden"type = "file" onChange={handleFileChange}/>
                          <span className="border rounded-lg p-2 block text-center border-gray-300 cursor-pointer">Edit</span>
                       </label>
                       
               
                    </div>
                   
                    <form className="grow" onSubmit = {handleProfileInfoUpdate}>
                        <label>First and last name</label>
                        <input type = "text" placeholder="First and last name" value={userName} onChange={ ev => setUserName(ev.target.value)}/>
                        <label>Email</label>
                        <input type = "email" value = {session.data.user.email} disabled = {true} placeholder = {'email'}/>
                        <label>Phone</label>
                        <input  type = "tel" placeholder="Phone number" value = {phone} onChange = { ev => setPhone(ev.target.value)}/>
                        <label>Street Address</label>
                        <input  type = "text" placeholder="Street Address"  value = {streetAddress} onChange = { ev => setStreetAddress(ev.target.value)}/>
                        <div className="flex gap-2">
                            <div>
                                <label>City</label>
                                <input   type = "text" placeholder="City Address"  value = {city} onChange = { ev => setCity(ev.target.value)}/>
                            </div>
                            <div>
                                <label>Postal Code</label>
                                <input   type = "text" placeholder="Postal code"  value = {postalCode} onChange = { ev => setPostalCode(ev.target.value)}/>
                            </div>
                           
                        </div>
                        <label>Country</label>
                        <input  type = "text" placeholder="Country"  value = {country} onChange = { ev => setCountry(ev.target.value)}/>
                      
                        
                        <button type = "submit">Save</button>
                    </form>
                </div>
            </div> 

        </section>
    );

}