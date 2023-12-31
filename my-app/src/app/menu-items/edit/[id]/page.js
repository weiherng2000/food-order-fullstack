'use client';

import DeleteButton from "@/components/DeleteButton";
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
      
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems,setRedirectToItems] = useState(false);   


  const {loading,data} = useProfile();
  //useParams contain the id of the menu item we want to edit
  const {id} = useParams();
  
  //useffect runs automitcally once when page is rendered and sends a get request to menu-items
  //we get the menu item of the item we want to edit which will fill out the edit form
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        //check for each item i each id for i is equal to the id of useParams
        const item = items.find(i => i._id === id);
        setMenuItem(item);
      });
    })
  }, []);

  async function handleFormSubmit(ev,data){

      ev.preventDefault();
      // we take the data from the form component and merge it with id to create a new data object
      //let and const not usesable here as they would clash with function parameters due to reassigment
      data = {...data,_id:id};
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/menu-items?_id='+id, {
        method: 'DELETE',
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

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
          <div className="max-w-2xl mx-auto mt-8">
              <Link href = {'/menu-items'} className= "button">
                  <Left/>
                  <span>Show all menu items</span>
                  
              </Link>
          </div>
          <MenuItemForm menuItem = {menuItem} onSubmit={handleFormSubmit}/>
          <div className="max-w-md mx-auto mt-2"> 
            <div className="max-w-xs ml-auto pl-4"> 
              <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick}/>
              
            </div>
           
          </div>
      </section>
    );

  
}