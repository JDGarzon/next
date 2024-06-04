"use client"
import Image from "next/image";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function User(){
    const { data: session, status } = useSession();
    const [user, setUser] = useState({"level":1,"wishes":0});
    const router = useRouter();

    const fetchUser=async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session?.user?.username}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.user?.token}`,
            },
          });
          const data = await res.json();
          console.log(data)
          setUser(data);
    }
  
    useEffect(() => {
      if (session && status === "authenticated") {
        fetchUser();
      }
    }, [session,status]);



    return (
        <nav className="game-nav">
            <div className="user-nav-details-container">
                <Image className="user-img" src="/icons/userIcon.png" alt="User placeholder" width={100} height={30}></Image>
                <div className="level-bar-container">
                    <div className="level-bar"></div>
                </div>
                <p className="user-level">Nv.<span> {user.level} </span></p>
            </div>

            <button className="almanac-btn" onClick={()=>{router.push("/game/almanac/characters")}}> Almanaque </button>

            <div className="wish-nav-detail-container">
                <Image className="wish-img" src="/icons/star.png" alt="Game wish image" width={100} height={30}></Image>
                <div className="wish-amount">{user.wishes}</div>
                <button className="more-wishes-btn"> + </button>
            </div>

        </nav>
    )

}