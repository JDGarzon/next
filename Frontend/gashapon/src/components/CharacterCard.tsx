import Image from 'next/image';
import "../app/globals.css";



const CharacterCard = ({ character:Character}) => {
  
  console.log(character)
  return (
    <div className="card">
      <Image src={character.img} alt={character.name} width={100} height={100} className="characterImage" />
      <h2 className={"characterName"}>{character.name}</h2>
      <p className={"characterLevel"}>Nivel: {character.level}</p>
      <p className={"characterRarity"}>Rareza: {character.rarity}★</p>
    </div>
  );
};

export default CharacterCard;