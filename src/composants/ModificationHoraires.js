import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ModificationHoraires = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/horaires");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const modifierHoraires = (id) => {
        navigate(`/dashboard-admin/modifier-horaires/${id}`)
    }

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Modifier horaire du zoo</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="conteneurHoraires">
                {data.map((horaire, index) => (
                    <div key={index} className="horaires">
                        <div className="horaires_details">{horaire.jour}</div>
                        {horaire.ouvert_fermer === "Fermer" ?
                            <div className="horaires_details">{horaire.ouvert_fermer}</div>
                            :
                            <div className="horaires_details">{horaire.heure_ouverture} - {horaire.heure_fermeture}</div>
                        }
                        <button className="bouton_zoo" onClick={() => modifierHoraires(horaire.id)}>
                            Modifier
                        </button>
                    </div >
                ))}
            </div >
        </>
    );
};

export default ModificationHoraires;