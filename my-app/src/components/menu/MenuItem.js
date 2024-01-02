import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem){

    const {image,name,description,basePrice,sizes,extraIngredientPrices} = menuItem;
    const [showPopup, setShowPopup] = useState(false);

    const {addToCart} = useContext(CartContext);
    function handleAddToCartButtonClick(){
        if(sizes.length === 0 && extraIngredientPrices.length === 0)
        {   
         
            addToCart(menuItem);
            toast.success('Added to cart');
        }
        else{
          setShowPopup(true);

        }
    }
    return (
        <>
            {/*the pop up will turn the screen black with the first div and the 2nd div is the message inside */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg max-w-md">
                        <Image src = {image} alt = {name} width={300} height={200} className="mx-auto"/>
                        <h2 className="text-lg font-bold text-center mb-4">{name}</h2>
                        <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                        {sizes?.length > 0 && (
                            <div className="bg-gray-200 rounded-md p-2">
                                <h3>Pick your size</h3>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick}{...menuItem}/>
        </>
      

    );
}