import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";
import Link from "next/link";

//with id = "about" and if link href = about it will go to the about section down in the page

export default function Home() {
  return (
    <>
     
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16" id = "about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'}/>
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p >
            Greetings! I'm [Your Name], a passionate [Your Profession or Interests] based in [Your Location]. 
            With a blend of creativity and [Any Unique Skill or Quality], 
            I embark on a journey to [Your Mission or Goal]. 
          </p>
          <p>
            Join me on this exciting expedition, 
            where we can explore, create, and grow together. Let's make every moment count!
          </p>
          <p>
            testing sentences hahaha
          </p>
        </div>
       
      </section>
      <section className="text-center my-8" id = "contact">
        <SectionHeaders subHeader={'Dont Hesitate'} mainHeader={'Contact us'}/>
        <div className="mt-8 ">
           <a className = "text-4xl underline text-gray-500" href= "tel: +6591773706">+65 91773706</a>
        </div>
      </section>
      
    </>
  )
}
