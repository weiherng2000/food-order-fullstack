'use client';
//this file allows us to use sessionprovider and usesession for our components
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function AppProvider({children}){
    const [cartProducts,setCartProducts] = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    },[]);

    function clearCart(){
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProducts()
    {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v,index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        })
    }

    function saveCartProductsToLocalStorage(cartProducts){
        if(ls){
            ls.setItem('cart',JSON.stringify(cartProducts));
        }
    }

    function addToCart(product,size = null,extras = []){
         setCartProducts(prevProducts => {
            const cartProduct = {...product,size,extras}
            const newProducts = [...prevProducts,cartProduct   ];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
         })
    }
    return(
        <SessionProvider>
            <CartContext.Provider value={{cartProducts,setCartProducts,addToCart,removeCartProducts,clearCart}}>
               {children}

            </CartContext.Provider>
         
        </SessionProvider>
    );
}