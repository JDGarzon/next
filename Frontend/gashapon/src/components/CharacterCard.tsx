import Image from 'next/image';
import "../app/globals.css";

const CharacterCard = ({ character }) => {
  return (
    <div className="card">
      <Image src={character.img} alt={character.name} width={100} height={100} className="characterImage" />
      <h2 className={"characterName"}>{character.name}</h2>
      <p className={"characterLevel"}>Level: {character.level}</p>
      <p className={"characterElement"}>Element: {character.element}</p>
      <p className={"characterRarity"}>Rarity: {character.rarity}★</p>
      <p className={"characterConstellation"}>Constellation: {character.constellation}</p>
    </div>
  );
};

export default CharacterCard;