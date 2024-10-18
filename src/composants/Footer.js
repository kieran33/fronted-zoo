import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Pour un défilement fluide
    });
  };

  const directionAccueil = () => {
    navigate("/");
    scrollToTop();
  };

  const directionAnimaux = () => {
    navigate("/animaux");
    scrollToTop();
  };

  const directionHabitats = () => {
    navigate("/habitats");
    scrollToTop();
  };

  const directionServices = () => {
    navigate("/services");
    scrollToTop();
  };

  const directionContact = () => {
    navigate("/contact");
    scrollToTop();
  };

  const directionConnexion = () => {
    navigate("/connexion");
    scrollToTop();
  };

  const [data, setData] = useState([]);

  const loadData = async () => {
    const reponse = await axios.get(
      "https://backend-zoo-production.up.railway.app/horaires"
    );
    setData(reponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="all_footer">
      <div className="footer">
        <div className="conteneurHoraires">
          <h3 className="titre_service">Horaire d'ouverture du zoo</h3>
          {data.map((horaire, index) => (
            <div key={index} className="footer_horaires">
              <div>{horaire.jour}</div>
              {horaire.ouvert_fermer === "Fermer" ? (
                <div> {horaire.ouvert_fermer} </div>
              ) : (
                <div>
                  {horaire.heure_ouverture} - {horaire.heure_fermeture}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="tarif">
          <p>Tarif Enfant (3 à 12 ans) : 13 €. </p>
          <p>Plein Tarif (à partir de 13 ans) : 17,50 €. </p>
          <p>
            Tarif Personne en Situation de Handicap : enfant 11,50 € et adulte
            15 €.
          </p>
        </div>
        <div className="lien_rapides">
          <h5>Lien rapides</h5>
          <ul>
            <a onClick={directionAccueil}>
              <li>Accueil</li>
            </a>
            <a onClick={directionAnimaux}>
              <li>Nos Animaux</li>
            </a>
            <a onClick={directionHabitats}>
              <li>Nos habitats</li>
            </a>
            <a onClick={directionServices}>
              <li>Nos services</li>
            </a>
            <a onClick={directionContact}>
              <li>Contactez-nous</li>
            </a>
            <a>
              <li>Se connecter</li>
            </a>
          </ul>
        </div>
      </div>
      <h5 className="copyright">
        Copyright © 2024 Zoo Arcadia All Rights Reserved.
      </h5>
    </div>
  );
};

export default Footer;
