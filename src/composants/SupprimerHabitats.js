import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SupprimerHabitats = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, [data]);

    const supprimerHabitats = (id) => {

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet habitat ?")) {
                axios.delete(`http://localhost:3002/habitats/supprimer/${id}`, { headers });
                //setTimeout(() => loadData(), 500);
            };
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Liste des habitats</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux" style={{ marginBottom: "40px" }}>
                            <img className="image_zoo_animaux"
                                src={`http://localhost:3002/image/${habitat.image}`}
                                alt={habitat.nom}></img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                        </div>
                        <button className="bouton_zoo" onClick={() => supprimerHabitats(habitat.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SupprimerHabitats;