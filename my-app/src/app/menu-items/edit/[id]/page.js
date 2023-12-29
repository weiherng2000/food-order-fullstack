'use client';

import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import MenuItem from "@/components/menu/MenuItem";
import {useProfile} from "@/components/UseProfile";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
      
  const [image,setImage] = useState('');
  const[name,setName] = useState('');
  const[description,setDescription] = useState('');
  const[basePrice,setBasePrice] = useState('');
  const [redirectToItems,setRedirectToItems] = useState(false);   


  const {loading,data} = useProfile();
  //useParams contain the id of the menu item we want to edit
  const {id} = useParams();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        //check for each item i each id for i is equal to the id of useParams
        const item = items.find(i => i._id === id);
        setImage(item.image);
        setName(item.name);
        setDescription(item.description);
        setBasePrice(item.basePrice);
      });
    })
  }, []);

  async function handleFormSubmit(ev){

      ev.preventDefault();
      const data = {image,name,description,basePrice,_id:id};
      const savingPromise = new Promise(async (resolve,reject) => {

          const response = await fetch('/api/menu-items', {
              method: 'PUT',
              body: JSON.stringify(data),
              headers: {'Content-Type' : 'application/json'},
          });
          if(response.ok)
          {
              resolve();
          }
          else
          {
              reject();
          }

      })

      await toast.promise(savingPromise,{
          loading:'Saving this tasty item',
          success:'Saved',
          error:'Error',
      })

      
      setRedirectToItems(true);


  }

  if(redirectToItems)
  {
      return redirect('/menu-items');
  }

  if (loading) {
      return 'Loading user info...';
  }
  
  if (!data.admin) {
      return 'Not an admin.';
  }

  return (
      <section className="mt-8">
          <UserTabs isAdmin = {true}/>
          <div className="max-w-md mx-auto mt-8">
              <Link href = {'/menu-items'} className= "button">
                  <Left/>
                  <span>Show all menu items</span>
                  
              </Link>
          </div>
          <MenuItemForm/>
      </section>
    );

  
}