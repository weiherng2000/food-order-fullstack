import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem){

    const {image,name,description,basePrice,sizes,extraIngredientPrices} = menuItem;
    const [showPopup, setShowPopup] = useState(false);
    //always set to the first size
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const {addToCart} = useContext(CartContext);


    async function handleAddToCartButtonClick() {
        console.log('add to cart');
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        // Check if there are options (sizes or extra ingredients) and if the popup is not already shown
        if (hasOptions && !showPopup) {
          setShowPopup(true);
          //This return prevents further execution of the code and is useful if you want to handle the popup display before proceeding with other actions.
          return;
        }
        // If there are options, but the popup is already shown, or there are no options, proceed to add to the cart
        addToCart(menuItem, selectedSize, selectedExtras);
        // Introduce a delay using a Promise to simulate an asynchronous operation (e.g., an API call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        //After the delay, it logs 'hiding popup' to the console and hides the popup 
        console.log('hiding popup');
        setShowPopup(false);
      }

    function handleExtraThingClick(ev,extraThing) {
        //check will return true or false depending whether the input checkbox is ticked or not
        const checked = ev.target.checked;
        if (checked) {
          setSelectedExtras(prev => [...prev, extraThing]);
        } 
        else //if checked is false it filters out the element with the same name as extraThing while
        //keeping element with a different name from extraThing
        {
          setSelectedExtras(prev => {
            return prev.filter(e => e.name !== extraThing.name);
          });
        }
      }
      
      //with the set statement it will re render the component causing selectedPrice to change as well
      let selectedPrice = basePrice;
        if (selectedSize) {
            selectedPrice += selectedSize.price;
        }
        if (selectedExtras?.length > 0) {
            for (const extra of selectedExtras) {
            selectedPrice += extra.price;
            }
        }
        console.log(selectedPrice);

    return (
        <>
            {/*the pop up will turn the screen black with the first div and the 2nd div is the message inside 
               the maxHeight 100vh -100px minus 100px from the top and bottom of the screen
            */}
            {showPopup && (
                <div 
                onClick={() => setShowPopup(false)}
                 className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg max-w-md"
                      onClick={ev => ev.stopPropagation()}>
                        <div className="overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 100px)'}}>
                            <Image src = {image} alt = {name} width={300} height={200} className="mx-auto"/>
                            <h2 className="text-lg font-bold text-center mb-4">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length > 0 && (
                                <div className=" p-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label className="flex items-center gap-2 p-4 rounded-md mb-1 border">
                                            <input type="radio" name = "size" 
                                            onClick={() => setSelectedSize(size)}
                                            checked={selectedSize?.name === size.name}
                                            />
                                            {size.name} ${basePrice +  size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className=" p-2">
                                    <h3 className="text-center text-gray-700">Any Extras?</h3>
                                    
                                    {extraIngredientPrices.map(extraThing => (
                                        <label className="flex items-center gap-2 p-4 rounded-md mb-1 border">
                                            <input
                                            onClick = {ev => {handleExtraThingClick(ev,extraThing)}}
                                            type="checkbox" name = {extraThing.name}/>
                                            {extraThing.name} +${ extraThing.price}
                                        </label>
                                    ))}
                            </div>
                            )}
                            <button  className = "primary sticky bottom-2" type = "button" onClick={handleAddToCartButtonClick}>
                                Add to cart ${selectedPrice}
                            </button>
                            <button
                                className="mt-2"
                                onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>
                        </div>         
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick}{...menuItem}/>
        </>
      

    );
}