'use client';

import Image from "next/image";
import { BannerElements } from "@/utils/BannerConstants";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Banner(){
    const { data: session, status } = useSession();
    const [activeBanner, setActiveBanner] = useState(0);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const router = useRouter();
  
    if (status === "loading") {
      return <p>Loading...</p>;
    }


    const clickNext = () =>{
        activeBanner === BannerElements.length - 1 
        ? setActiveBanner(0) 
        : setActiveBanner(activeBanner + 1)
    }

    const clickPrev = () =>{
        activeBanner === 0
        ? setActiveBanner(BannerElements.length - 1) 
        : setActiveBanner(activeBanner - 1)
    }

    const clickSpecificElement = (index : number) =>{
        setActiveBanner(index)
    }

    const fetch10Wishes=async()=>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gacha/character10`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.user?.token}`,
            },
            });
            const data = await res.json();
            console.log(data)
            if(data.statusCode==404){
                throw new Error
            }
            const queryString = new URLSearchParams({ characters: JSON.stringify(data) }).toString();
            router.push(`/game/banner/[id]?id=${queryString}`);
        } catch (error) {
            setAlert({ message: "Faltan deseos", type: 'error' });
            console.log(error)
            
        }
        
    }

    const fetch1Wishes=async()=>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gacha/character1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session?.user?.token}`,
            },
            });
            const data = await res.json();
            if(data.statusCode==404){
                throw new Error
            }
            const queryString = new URLSearchParams({ characters: JSON.stringify(data) }).toString();
            router.push(`/game/banner/[id]?id=${queryString}`);
        } catch (error) {
            setAlert({ message: "Faltan deseos", type: 'error' });
            console.log(error)

        }
       
    }

    return (
        <div className="banner-carrousel">
            {BannerElements.map((element, index) => (
                <div className={`${
                    index === activeBanner
                    ? "banner"
                    : "hidden"
                }`} key={index}>
                    <div className="banner-text-box" style={{ backgroundColor: element.bgTextColor }}>
                        <p className="banner-title"> Mejor premio </p>
                        <p className="best-price-name"> {element.priceName} </p>
                        <div className="stars">
                            <Image className="star" src="/icons/star.png" alt="star 1" width={100} height={24}/>
                            <Image className="star" src="/icons/star.png" alt="star 2" width={100} height={24}/>
                            <Image className="star" src="/icons/star.png" alt="star 3" width={100} height={24}/>
                            <Image className="star" src="/icons/star.png" alt="star 4" width={100} height={24}/>
                            <Image className="star" src="/icons/star.png" alt="star 5" width={100} height={24}/>

                        </div>
                        <p className="banner-text"> Gachapon especial disponible </p>
                    </div>
                    <div className="banner-image-section">
                        <Image className="banner-character" src={element.bannerImg} alt={element.priceName} width={500} height={300}/>
                        <div className="banner-btns">
                            <button className="wish-btn" onClick={fetch1Wishes}> x1 </button>
                            <button className="wish-btn" onClick={fetch10Wishes}> x10 </button>
                        </div>
                        
                    </div>
                </div>
            ))}
            <div className="carrousel-btns">
            <button className="carrousel-prev-btn" onClick={() => clickPrev()}></button>
            {BannerElements.map((element, index)=>(
                <button key={index} className="carrousel-btn" onClick={() => clickSpecificElement(index)}></button>
            ))}
            <button className="carrousel-next-btn" onClick={() => clickNext()}></button>
            </div>
        </div>
        
    );
}
