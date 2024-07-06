import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SupprimerServices = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/services");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, [data]);

    const supprimerServices = (id) => {

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement ce service ?")) {
                axios.delete(`http://localhost:3002/services/supprimer/${id}`, { headers });
                //setTimeout(() => loadData(), 500);
            };
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const retour = () => {
        if (role === "admin") {
            navigate("/dashboard-admin");
        } else {
            navigate("/dashboard-employe")
        }
    };

    return (
        <>
            <h2 className="titre_service">Supprimer services</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_service" style={{ marginBottom: "40px" }}>
                            <img className="image_zoo_service"
                                src={`http://localhost:3002/image/${service.image}`}
                                alt={service.nom}>
                            </img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{service.nom}</div>
                        </div>
                        <button className="bouton_zoo" onClick={() => supprimerServices(service.id)} >Supprimer</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SupprimerServices;