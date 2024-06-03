import CharacterCard from '@/components/CharacterCard';
import "../../globals.css";

const characters = [
  {
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },
  {
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },
  {
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },
  {
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },
  {
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },{
    name: 'Xiao',
    element: 'ANEMO',
    rarity: 5,
    constellation: 0,
    level: 90,
    img: 'https://static.wikia.nocookie.net/gen-impact/images/7/7f/Xiao_Card.png/revision/latest?cb=20210303043521&path-prefix=es'
  },
  // Agrega más personajes aquí
];

export default function Characters() {
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