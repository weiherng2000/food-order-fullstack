'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu(){

    const [bestSellers,setBestSellers] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                //take the last 3 items from the end
              
                setBestSellers(menuItems.slice(-3));
                 
            })
        })
    })
    return (
         <section >
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/sallad1.png'} width={109} height={189}  alt = {'sallad'}/>
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <Image src={'/sallad2.png'} width={109} height={189} alt = {'sallad'}/>
                </div>
            </div>
           
            <div className="text-center mb-4">
                <SectionHeaders subHeader={'check out'} mainHeader={'Our best sellers'}/>
            </div>
            <div className="grid grid-cols-3 gap-4"> 
                
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    
                    <MenuItem {...item}/>
                ))}
            </div>
            
         </section>
    );
}