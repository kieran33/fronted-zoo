import React from 'react';
import Navigation from '../composants/Navigation';
import erreur from '../image/Ecf-zoo-page-erreur-transparent.png';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';

const Erreur = () => {

    const navigate = useNavigate();

    const retourAccueil = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <>
            <Navigation />
            <div className="centrer" style={{ flexDirection: "column", alignItems: "center" }}>
                <img src={erreur} className="image_erreur"></img>
                <h2 className="titre_service">Erreur, la page est introuvable</h2>
                <button className="bouton_zoo" onClick={retourAccueil}>Retour accueil</button>
            </div>
            <Footer />
        </ >
    );
};

export default Erreur;