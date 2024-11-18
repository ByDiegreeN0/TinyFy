import React from "react";
import AnuncioBurger from '../../assets/Img/Anuncios/AnuncioBurger.jpg';
import AnuncioCoca from '../../assets/Img/Anuncios/AnuncioCoca.jpg';
import AnuncioDominos from '../../assets/Img/Anuncios/AnuncioDominos.jpg';
import AnuncioMc from '../../assets/Img/Anuncios/AnuncioMc.jpg';
import AnuncioPepsi from '../../assets/Img/Anuncios/AnuncioPepsi.png';
import AnuncioSnikers from '../../assets/Img/Anuncios/AnuncioSnikers.png';
import "../styles/stylesPages/InterstitialPage.css";

const InterstitialPage = () => {
    const banners = [
        { id: 1, image: AnuncioBurger, alt: "Anuncio Burger" },
        { id: 2, image: AnuncioCoca, alt: "Anuncio Coca Cola" },
        { id: 3, image: AnuncioDominos, alt: "Anuncio Dominos" },
        { id: 4, image: AnuncioMc, alt: "Anuncio McDonalds" },
        { id: 5, image: AnuncioPepsi, alt: "Anuncio Pepsi" },
        { id: 6, image: AnuncioSnikers, alt: "Anuncio Snikers" }
    ];

    return (
        <div className="interstitial-container">
            <div className="interstitial-grid">
                {banners.map((banner) => (
                    <div key={banner.id} className="interstitial-item">
                        <img 
                            src={banner.image} 
                            alt={banner.alt}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterstitialPage;
