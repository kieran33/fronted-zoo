import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import { BACKEND_URL } from '../Constante';

const ModificationServices = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("https://backend-zoo-production.up.railway.app/services");
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
            <h2 className="titre_service">Choisissez le service à modifier</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_service">
                            <Link to={`/dashboard-admin/modifier-services/${service.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_service"
                                    src={`https://backend-zoo-production.up.railway.app/image/${service.image}`}
                                    alt={service.nom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>Modifier "{service.nom}"</div>
                        </div>

                    </div>
                ))}
            </div>
        </ >
    );
};

export default ModificationServices;