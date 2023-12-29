'use client';
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Right from "@/components/icons/Right";

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
       <section className="mt-8 max-w-md mx-auto "> 
           <UserTabs isAdmin={true}/>
           <div className="mt-8">
              <Link  className = "button flex " href = {'/menu-items/new'}>   <Right/> <span>Create new Menu item</span></Link>
            
           </div>
          
       </section>
    );
}