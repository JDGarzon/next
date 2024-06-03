'use client'
import WeaponCard from '@/components/WeaponCard';
import { useSession } from "next-auth/react";
import "../../../globals.css";
import { useState, useEffect } from "react";

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
    <div className="containerCharacter">
      <h1>My Characters</h1>
      <div className="charactersGrid">
        {weapons.map((character, index) => (
          <WeaponCard key={index} weapon={character} />
        ))}
      </div>
    </div>
  );
}
