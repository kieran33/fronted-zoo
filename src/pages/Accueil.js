import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../composants/Navigation';
import AvisVisiteur from '../composants/AvisVisiteur';
import Footer from '../composants/Footer'
import perroquet from '../image/perroquet-zoo.png'
import animaux from '../image/groupe-animaux.jpg';
import services from '../image/services-zoo.jpg';
import habitats from '../image/paysage-jungle.jpg';

const Accueil = () => {

    const navigate = useNavigate();

    const directionAnimaux = () => {
        navigate("/animaux");
    };

    const directionHabitats = () => {
        navigate("/habitats");
    };

    const directionServices = () => {
        navigate("/services");
    };

    return (
        <>
            <Navigation />
            <div className="centrer">
                <img src={perroquet} className="perroquet" width="300" height="auto" alt="perroquet zoo" />
            </div>
            <div className="centrer">
                <p className="paragraphe">Implanté sur prés de 5 hectares, le zoo d’Asson est unique de part la richesse et l’originalité de ses
                    collections et les modes de présentation des espèces choisis.
                    ici, les animaux (répartis en une centaine d’espèces) sont issus de contrées lointaines d’Asie,
                    d’Amérique du Sud, d’Afrique tropicale et d’Australie et évoluent dans un cadre verdoyant et exotique.
                </p>
            </div>
            <div className="centrer">
                <div className="div_zoo" style={{ marginBottom: "40px" }} onClick={directionAnimaux}>
                    <img src={animaux} className="image_zoo" alt="animaux zoo" />
                    <div className="text_zoo">Découvrez nos animaux</div>
                </div>
                <div className="div_zoo" style={{ marginBottom: "40px" }} onClick={directionHabitats}>
                    <img src={habitats} className="image_zoo" alt="habitats zoo" />
                    <div className="text_zoo">Découvrez les habitats</div>
                </div>
                <div className="div_zoo" style={{ marginBottom: "40px" }} onClick={directionServices}>
                    <img src={services} className="image_zoo" width="50" alt="services zoo" />
                    <div className="text_zoo">Découvrez nos services</div>
                </div>
            </div>
            <AvisVisiteur />
            <Footer />
        </>
    );
};

export default Accueil;