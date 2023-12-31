'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
    
    const {loading,data} = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        //get request
        fetch('/api/menu-items').then(res => {
          res.json().then(menuItems => {
            setMenuItems(menuItems);
          });
        })
      }, []);

   
    if (loading) {
        return 'Loading user info...';
    }
    
    if (!data.admin) {
        return 'Not an admin.';
    }
    

    return (
       <section className="mt-8 max-w-2xl mx-auto "> 
           <UserTabs isAdmin={true}/>
           <div className="mt-8">
              <Link  className = "button flex " href = {'/menu-items/new'}>   <Right/> <span>Create new Menu item</span></Link>
            
           </div>
           <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu items</h2>
            <div className="grid grid-cols-3 gap-2">
                {menuItems?.length > 0 && menuItems.map(item => (
                  <Link  key={item._id} href = {'/menu-items/edit/' +item._id}className="bg-gray-200 rounded-lg p-4 mb-1 flex-col">
                    <div className="relative">
                      <Image  className= " rounded-md" src = {item.image} alt = {''} width = {200} height = {200} />
                    </div>
                    <div className="text-center">
                        {item.name}
                    </div>
                  
                  </Link>

                ))}
            </div>
            
           </div>
          
       </section>
    );
}