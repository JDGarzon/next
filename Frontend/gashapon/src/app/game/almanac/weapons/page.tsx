'use client'
import WeaponCard from '@/components/WeaponCard';
import { useSession } from "next-auth/react";
import "../../../globals.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Characters() {
  const { data: session, status } = useSession();
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchCharacters();
    }
  }, [session, status]);

  const fetchCharacters = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session?.user?.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const resD = await res.json();
      console.log(resD.almanac[0])
      setWeapons(resD.almanac[0]);
    } catch (error) {
      console.error('Error fetching weapons:', error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Debes iniciar sesión para ver tus personajes.</div>;
  }

  return (
    <div className='wish-container'>
      <div className="containerCharacter">
        <div className='almanac-header'>
          <Link href={`/game/banner`} className="almanac-return-btn">
            <Image className="almanac-return-image" src={"/icons/prev.png"} alt={"Return Icon"} width={40} height={40} />
            <p>Regresar</p>
          </Link>
          <h1>Mis Armas</h1>
          <div className='almanac-change-category-btns'>
            <Link href={`/game/almanac/characters`} className="almanac-change-category-btn-active">
              <p>Personajes</p>
            </Link>
            <Link href={`/game/almanac/weapons`} className="almanac-change-category-btn">
              <p>Armas</p>
            </Link>
          </div>
        </div>
        <div className="charactersGrid">
          {weapons.map((character, index) => (
            <WeaponCard key={index} weapon={character} />
          ))}
        </div>
      </div>
    </div>
    
  );
}
