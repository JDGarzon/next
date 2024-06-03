'use client'
import CharacterCard from '@/components/CharacterCard';
import { useSession } from "next-auth/react";
import "../../../globals.css";
import { useState, useEffect } from "react";

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
    <div className="containerCharacter">
      <h1>My Characters</h1>
      <div className="charactersGrid">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
