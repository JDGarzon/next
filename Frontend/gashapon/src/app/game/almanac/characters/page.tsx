'use client'
import CharacterCard from '@/components/CharacterCard';
import { useSession } from "next-auth/react";
import "../../../globals.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Characters() {
  const { data: session, status } = useSession();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchCharacters();
    }
  }, [session, status]);

  // Función para obtener los personajes
  const fetchCharacters = async () => {
    try {
      // Simula una llamada a una API
      console.log(session?.user?.username)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session?.user?.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const resD = await res.json();
      console.log(resD.almanac[1])
      setCharacters(resD.almanac[1]);
    } catch (error) {
      console.error('Error fetching characters:', error);
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
          <h1>Mis Personajes</h1>
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
          {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
        </div>
      </div>
    </div>
    
  );
}
