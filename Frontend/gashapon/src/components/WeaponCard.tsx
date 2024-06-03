import Image from 'next/image';
import "../app/globals.css";

const WeaponCard = ({ weapon }) => {
  return (
    <div className="card">
      <Image src={weapon.img} alt={weapon.name} width={100} height={100} className="characterImage" />
      <h2 className={"characterName"}>{weapon.name}</h2>
      <p className={"characterLevel"}>Level: {weapon.level}</p>
      <p className={"characterLevel"}>Type: {weapon.type}</p>
      <p className={"characterLevel"}>Rarity: {weapon.rarity}★</p>
      <p className={"characterLevel"}>Sub stats: {weapon.subStats}</p>
      <p className={"characterLevel"}>Effect: {weapon.effect}</p>
    </div>
  );
};

export default WeaponCard;