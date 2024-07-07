import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { BACKEND_URL } from '../Constante';

const AjoutNourritureAnimaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("https://backend-zoo-production.up.railway.app/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const retour = () => {
        navigate("/dashboard-employe");
    };

    return (
        <>
            <h2 className="titre_service">Choisissez l'animal à nourrir</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux">
                            <Link to={`/dashboard-employe/ajout-nourriture/${animal.id}/${animal.prenom}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_animaux"
                                    src={`https://backend-zoo-production.up.railway.app/image/${animal.image}`}
                                    alt={animal.prenom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AjoutNourritureAnimaux;