import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get('http://localhost:3002/horaires')
        setData(reponse.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="footer">
            <div className="conteneurHoraires">
                <h3 className="titre_service">Horaire d'ouverture du zoo</h3>
                {data.map((horaire, index) => (
                    <div key={index} className="footer_horaires">
                        <div>{horaire.jour}</div>
                        {horaire.ouvert_fermer === "Fermer" ?
                            < div > {horaire.ouvert_fermer} </div>
                            :
                            <div>{horaire.heure_ouverture} - {horaire.heure_fermeture}</div>
                        }
                    </div>
                ))}
            </div>
            <div className="tarif">
                <p>Tarif Enfant (3 à 12 ans) : 13 €. </p>
                <p>Plein Tarif (à partir de 13 ans) : 17,50 €. </p>
                <p>Tarif Personne en Situation de Handicap : enfant 11,50 € et adulte 15 €.</p>
            </div>
        </div >
    );
};

export default Footer;