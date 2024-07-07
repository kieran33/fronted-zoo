import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { BACKEND_URL } from '../Constante';

const SupprimerAnimaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("https://backend-zoo-production.up.railway.app/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const supprimerAnimaux = async (id, prenom) => {

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet animal ?")) {

                const reponse = axios.delete(`https://backend-zoo-production.up.railway.app/animaux/supprimer/${id}`, { headers });

                if (reponse) {
                    await axios.delete(`https://backend-zoo-production.up.railway.app/supprimer-animaux-vues/${prenom}`);
                    await axios.delete(`https://backend-zoo-production.up.railway.app/animaux-soins/supprimer/${prenom}`);
                    await axios.delete(`https://backend-zoo-production.up.railway.app/animaux-nourriture/supprimer/${prenom}`);
                }
                else {
                    alert("La requête à échoué");
                }
            };
        }
        else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Choisissez l'animal à supprimer</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux" style={{ marginBottom: "40px" }}>
                            <img className="image_zoo_animaux"
                                src={`https://backend-zoo-production.up.railway.app/image/${animal.image}`}
                                alt={animal.prenom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                        <button className="bouton_zoo"
                            onClick={() => supprimerAnimaux(animal.id, animal.prenom)}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SupprimerAnimaux;