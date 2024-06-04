'use client'
import CharacterCard from './CharacterCard';
import { useSession } from "next-auth/react";
import "../app/globals.css";
import { useEffect ,useState} from "react";

export default function CharactersWish({characters}) {
  const { data: session, status } = useSession();
  

  useEffect(() => {
    if (session && status === "authenticated") {
      console.log(characters)
    }
  }, [session, status]);


  if (status === "loading") {
    return <div>Loading...</div>;
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
