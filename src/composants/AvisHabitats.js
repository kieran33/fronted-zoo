import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AvisHabitats = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const retour = () => {
        navigate("/dashboard-veterinaire");
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
                        <div className="div_zoo_animaux">
                            <Link to={`/dashboard-veterinaire/aivs-habitats/${habitat.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_animaux"
                                    src={`http://localhost:3002/image/${habitat.image}`}
                                    alt={habitat.nom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AvisHabitats;