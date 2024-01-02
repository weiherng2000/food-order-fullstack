'use client';
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";

export default function CartPage() {
    
    //usecontext allows us to share state within components without passing it as props
    const{cartProducts} = useContext(CartContext);
    return(
        <section className="mt-8">
            <div className="text-center">
               <SectionHeaders mainHeader="Cart" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>{cartProducts?.length === 0 && (
                    <div>No products in your shopping cart</div>
                )}
                {cartProducts?.length > 0 && cartProducts.map(product =>(
                    <div className="flex gap-4 mb-2 border-b py-2 items-center">
                        <div className="w-24">
                            <Image width = {240} height={240} src={product.image} alt = {''}/>
                        </div>
                        <div>
                            <h3>{product.name}</h3>
                            {product.size && (
                                <div>Size: <span>{product.size.name}</span></div>
                            )}
                        </div>
                        
                    </div>
                ))}
                </div>
                <div>right</div>
            </div>
        </section>
    );
}