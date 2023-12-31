'use client'
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    
    //runs useprofile function which fetches the data and the loading state
    const {loading:profileLoading, data:profileData} = useProfile();
    const [categories,setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);
    
    //
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                  setCategories(categories);
            });
        });

    },[]);
    
    //fetch all the current catgeories from our mongo db database and set them
    function fetchCategories(){
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                  setCategories(categories);
            });
        });
    }
    
    async function handleCategorySubmit(ev){

        ev.preventDefault();
        const creationPromise = new Promise( async (resolve,reject) => {
            //change the category name to one we input into the input field
            const data = {name:categoryName};
            //if we are editing the category our data id will be equal to the  edit data id we want to edit
            if (editedCategory) {
                data._id = editedCategory._id;
              }

            const response = await fetch('/api/categories', 
            {
                //if catgeory is being updated we update instead of create
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if(response.ok)
            {
                resolve();
            }
            else
            {
                reject();
            }


        });
        await toast.promise(creationPromise, 
        {
            loading: editedCategory
                       ? 'Updating category...'
                       : 'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error, sorry...',
        });
        
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/categories?_id='+_id, {
            method: 'DELETE',
          });
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
          });
      
          fetchCategories();
    }

    if (profileLoading) 
    {
        return 'Loading user info...';
    }
    
    if (!profileData.admin) 
    {
        return 'Not an admin';
    }

    return (

        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>
                                  : <b>{editedCategory.name}</b>
                                </>
                            )}
                        </label>
                        <input type = "text" value = {categoryName} onChange={ ev => setCategoryName(ev.target.value)}/>
                    </div>
                    <div className="pb-2 flex gap-2">
                        {/*clicking this button will trigger the onsubmit event on the form*/}
                        <button className="border border-primary" type = "submit">{editedCategory ? 'Update' : 'Create'}</button>
                        <button type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setCategoryName('');
                            }}>  Cancel </button>

                    </div>

                </div>
               
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
                {categories?.length > 0 && categories.map( c=> (
                   
                   <div
                   key={c._id}
                   className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                   <div className="grow">
                     {c.name}
                   </div>
                   <div className="flex gap-1">
                     <button type="button"
                             onClick={() => {
                               setEditedCategory(c);
                               setCategoryName(c.name);
                             }}>
                       Edit
                     </button>
                     <button onClick = {() => handleDeleteClick(c._id)} type="button">Delete</button>    
                   </div> 

                 </div>

                    
                ))}
            </div>
         
        </section>
    );
}