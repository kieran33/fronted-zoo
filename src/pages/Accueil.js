import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../composants/Navigation";
import AvisVisiteur from "../composants/AvisVisiteur";
import Footer from "../composants/Footer";
//import perroquet from "../image/perroquet-zoo.png";
import animaux from "../image/groupe-animaux.jpg";
import services from "../image/services-zoo.jpg";
import habitats from "../image/paysage-jungle.jpg";
import zoo_arcadia from "../image/entrée zoo arcadia.jpg";
import icone_animaux from "../image/wild-animals.png";
import icone_arbre from "../image/arbre.png";
import icone_conservation from "../image/assurance-pour-animaux-de-compagnie.png";
import icone_hebergement from "../image/hebergement.png";

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
    <div className="hub_accueil">
      <Navigation />
      <header className="main-header">
        <h1>Bienvenue au Zoo Arcadia</h1>
      </header>
      {/*<div className="centrer">
        <img
          src={perroquet}
          className="perroquet"
          width="300"
          height="auto"
          alt="perroquet zoo"
        />
      </div>*/}
      <div className="section-container">
        <div className="text-container">
          <p>
            Implanté sur prés de 5 hectares, le zoo d’Arcadia est unique de part
            la richesse et l’originalité de ses collections et les modes de
            présentation des espèces choisis.
          </p>
          <p>
            Ici, les animaux (répartis en une centaine d’espèces) sont issus de
            contrées lointaines d’Asie, d’Amérique du Sud, d’Afrique tropicale
            et d’Australie et évoluent dans un cadre verdoyant et exotique.
          </p>
        </div>
        <div className="image-container">
          <img src={zoo_arcadia} alt="Description de l'image" />
        </div>
      </div>
      <div className="zoo-info-container">
        <h2 className="zoo-info-title">Arcadia c'est...</h2>
        <div className="zoo-info-cards">
          <div className="zoo-info-card">
            <img src={icone_animaux} alt="Icone Animaux" className="icon" />
            <h3>1200</h3>
            <p>animaux d'Afrique, d'Asie et d'Amérique</p>
          </div>
          <div className="zoo-info-card">
            <img src={icone_arbre} alt="Icone Arbre" className="icon" />
            <h3>15</h3>
            <p>hectares arborés</p>
          </div>
          <div className="zoo-info-card">
            <img
              src={icone_conservation}
              alt="Icone Buffalo"
              className="icon"
            />
            <h3>46</h3>
            <p>programmes de conservation</p>
          </div>
          <div className="zoo-info-card">
            <img
              src={icone_hebergement}
              alt="Icone Hébergement"
              className="icon"
            />
            <h3>24</h3>
            <p>hébergements au cœur du parc</p>
          </div>
        </div>
      </div>
      <div className="centrer" style={{ marginTop: "80px" }}>
        <div
          className="div_zoo"
          style={{ marginBottom: "40px" }}
          onClick={directionAnimaux}
        >
          <img src={animaux} className="image_zoo" alt="animaux zoo" />
          <div className="text_zoo">Découvrez nos animaux</div>
        </div>
        <div
          className="div_zoo"
          style={{ marginBottom: "40px" }}
          onClick={directionHabitats}
        >
          <img src={habitats} className="image_zoo" alt="habitats zoo" />
          <div className="text_zoo">Découvrez les habitats</div>
        </div>
        <div
          className="div_zoo"
          style={{ marginBottom: "40px" }}
          onClick={directionServices}
        >
          <img
            src={services}
            className="image_zoo"
            width="50"
            alt="services zoo"
          />
          <div className="text_zoo">Découvrez nos services</div>
        </div>
      </div>
      <AvisVisiteur />
      <Footer />
    </div>
  );
};

export default Accueil;
