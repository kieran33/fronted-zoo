import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import { useNavigate } from 'react-router-dom';

const CompteRenduAnimaux = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
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
            <div className="dashboard_global">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Choisissez un animal pour voir ce qu'il a consommé</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className="centrer">
                        {data.map((animal, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux">
                                    <Link to={`/dashboard-veterinaire/compte-rendu-animaux/${animal.id}/${animal.prenom}`} style={{ opacity: "1" }}>
                                        <img className="image_zoo_animaux"
                                            src={`http://localhost:3002/image/${animal.image}`}
                                            alt={animal.prenom}>
                                        </img>
                                    </Link>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </ >
    );
};

export default CompteRenduAnimaux;