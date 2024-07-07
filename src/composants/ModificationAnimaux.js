import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
//import { BACKEND_URL } from '../Constante';

const ModificationAnimaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get(BACKEND_URL + "/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Choisissez l'animal à modifier</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux">
                            <Link to={`/dashboard-admin/modifier-animaux/${animal.id}/${animal.prenom}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_animaux"
                                    src={BACKEND_URL + `/image/${animal.image}`}
                                    alt={animal.prenom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>Modifier "{animal.prenom}"</div>
                        </div>
                    </div>
                ))}
            </div>
        </ >
    );
};

export default ModificationAnimaux;