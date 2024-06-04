"use client";
// src/app/game/banner/[wishes]/page.tsx
import { useSearchParams  } from 'next/navigation'
import { useSession } from "next-auth/react";
import CharactersWish from '@/components/CharacterWishes';

export default function Page() {
  const { data: session, status } = useSession();
  const search = useSearchParams ();
  let characters:any=[]
  
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const id=search.get("id")

  if(id){
    const jsonString = id.replace('characters=', '');
    console.log((jsonString))
    console.log(JSON.parse(jsonString))
    
    const char=JSON.parse(jsonString)
    if(char.length==1){
      console.log(char)
      characters.push(char[0])
    }else char.forEach((character:any) => {console.log(character),characters.push(character[0])})
  }
  
  return(
    <div className='wish-container'>
      <CharactersWish characters={characters}></CharactersWish>

    </div>
  ) 
}

