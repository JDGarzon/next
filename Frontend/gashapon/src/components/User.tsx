"use client"
import Image from "next/image";
import "../app/globals.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function User(){
    const { data: session, status } = useSession();
    const [user, setUser] = useState({
      "level":1,
      "wishes":0,
      "_id":""
    });
    const router = useRouter();
    const [errors, setErrors] = useState<string[]>([]);


   
  
    useEffect(() => {
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
      if (session && status === "authenticated") {
        fetchUser();
      }
    }, [session,status]);

    const handleMoreWishes = async (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(user);
      e.preventDefault();
  
      // Actualiza el estado del usuario con +5 deseos
      const updatedUser = { ...user, wishes: user.wishes + 5 };
      setUser(updatedUser);
      console.log(user);
      try {
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/self`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(updatedUser),
        });
  
        const responseAPI = await res2.json();
  
        if (!res2.ok) {
          setErrors(responseAPI.message);
          return;
        }
  
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    };
    

    return (
      <nav className="game-nav">
        <div className="user-nav-details-container">
          <Image className="user-img" src="/icons/userIcon.png" alt="User placeholder" width={100} height={30}></Image>
          <div className="level-bar-container">
            <div className="level-bar"></div>
          </div>
          <p className="user-level">Nv.<span> {user.level} </span></p>
        </div>
  
        <button className="almanac-btn" onClick={() => { router.push("/game/almanac/characters") }}> Almanaque </button>
  
        <div className="wish-nav-detail-container">
          <Image className="wish-img" src="/icons/star.png" alt="Game wish image" width={100} height={30}></Image>
          <div className="wish-amount">{user.wishes}</div>
          <button className="more-wishes-btn" onClick={handleMoreWishes}> + </button>
        </div>
      </nav>
    );

}