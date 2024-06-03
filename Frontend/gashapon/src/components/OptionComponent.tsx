import Link from 'next/link';
import Image from 'next/image';
import "../app/globals.css"

interface OptionProps {
  text: string;
  route: string;
}

const OptionComponent: React.FC<OptionProps> = ({  text, route }) => {
  return (
    <div className="option">
      <span className="text">{text}</span>
      <Link href={route}>
      <Image src={"/icons/book.png"} alt={"Ir"} width={20} height={20} className="characterImage" />
      </Link>
    </div>
    
  );
};

export default OptionComponent;
