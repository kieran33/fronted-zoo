import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuppressionPersonnels = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/personnels");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, [data]);

    const supprimerPersonnels = (id) => {

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce compte personnel ?")) {
                axios.delete(`http://localhost:3002/personnels/supprimer/${id}`, { headers });
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
            <h2 className="titre_service">Liste du personnel</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.filter(personnel => personnel.role !== "admin").map((personnel, index) => (
                    <div className="animal" key={index}>
                        <p className="titre_service" >Nom d'utilisateur : {personnel.nom_utilisateur}</p>
                        <p className="titre_service">role : {personnel.role}</p>
                        <button className="bouton_zoo" onClick={() => supprimerPersonnels(personnel.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SuppressionPersonnels;