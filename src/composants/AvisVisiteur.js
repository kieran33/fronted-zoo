import React from "react";
import DonnerAvis from "./DonnerAvis";
import { useState, useEffect } from "react";
import axios from "axios";
//import { BACKEND_URL } from '../Constante';

const AvisVisiteur = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const reponse = await axios.get(
      "https://backend-zoo-production.up.railway.app/avis-verif"
    );
    setData(reponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="conteneurAvis">
      <h2 className="titre_service">Nos visiteurs parle de nous</h2>
        {data.map((avis, index) => (
          <div className="avis_visiteur" key={index}>
            <div className="avis_pseudo">
              <h4>{avis.pseudo}</h4>
            </div>
            <div className="avis_message">
                <p>{avis.message}</p>
            </div>
          </div>
        ))}
      <DonnerAvis />
    </div>
  );
};

export default AvisVisiteur;
