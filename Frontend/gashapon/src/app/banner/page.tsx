import Image from "next/image";

export default function Banner(){
    return (
        <div className="banner ">
            <div className="banner-text-box">
                <p className="banner-title"> Mejor premio </p>
                <p className="best-price-name"> Name </p>
                <div className="stars">
                    <Image className="star" src="/icons/star.png" alt="star 1" width={100} height={24}/>
                    <Image className="star" src="/icons/star.png" alt="star 2" width={100} height={24}/>
                    <Image className="star" src="/icons/star.png" alt="star 3" width={100} height={24}/>
                    <Image className="star" src="/icons/star.png" alt="star 4" width={100} height={24}/>
                    <Image className="star" src="/icons/star.png" alt="star 5" width={100} height={24}/>

                </div>
                <p className="banner-text"> Gachapon especial disponible </p>
            </div>
            <div className="banner-image-section">
                <Image className="banner-character" src="/img/arlecchino.jpg" alt="arlecchino" width={500} height={300}/>
                <div className="banner-btns">
                    <button className="wish-btn"> x1 </button>
                    <button className="wish-btn"> x10 </button>
                </div>
                
            </div>
        </div>
    );
}