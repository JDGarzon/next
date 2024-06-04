'use client'
import CharacterCard from './CharacterCard';
import { useSession } from "next-auth/react";
import "../app/globals.css";
import { useEffect ,useState} from "react";
import Link from 'next/link';
import Image from 'next/image';

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
      <div className='almanac-header'>
        <Link href={`/game/banner`} className="almanac-return-btn">
          <Image className="almanac-return-image" src={"/icons/prev.png"} alt={"Return Icon"} width={40} height={40} />
          <p>Regresar</p>
        </Link>
        <h1>Premios</h1>
      </div>
      
      <div className="charactersGrid">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
