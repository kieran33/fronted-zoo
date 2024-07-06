import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModificationPersonnels = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/personnels");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const modifierPersonnels = (id) => {
        navigate(`/dashboard-admin/modifier-personnels/${id}`)
    }

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
                        <p className="titre_service">Nom d'utilisateur : {personnel.nom_utilisateur}</p>
                        <p className="titre_service">role : {personnel.role}</p>
                        <button className="bouton_zoo" onClick={() => modifierPersonnels(personnel.id)}>Modifier</button>
                    </div>
                ))}
            </div>
        </ >
    );
};

export default ModificationPersonnels;