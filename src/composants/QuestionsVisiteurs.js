import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import BarreDashboardEmploye from './BarreDashboardEmploye';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const QuestionsVisiteurs = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");

    const loadData = async () => {
        const reponse = await axios.get('http://localhost:3002/questions')
        setData(reponse.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    const retour = () => {
        navigate("/dashboard-employe");
    };

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Espace questions/messages des visiteurs</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className="conteneurAvis">
                        {data.map((questions, index) => (
                            <div className="avis_visiteur" index={index}>
                                <h4 className="titre_service">Message de : {questions.email}</h4>
                                <h4 className="titre_service">Titre : {questions.titre}</h4>
                                <p className="titre_service">
                                    <h4>Description :</h4>
                                    {questions.description}
                                </p>
                                {token ?
                                    <button
                                        className="bouton_zoo"
                                        style={{ marginBottom: "20px" }}
                                        onClick={() => window.location = `mailto:${questions.email}`}
                                    >
                                        Répondre
                                    </button>
                                    :
                                    <button
                                        className="bouton_zoo"
                                        style={{ marginBottom: "20px" }}
                                        onClick={() => alert("Vous n'êtes pas autorisé à effectuer cette action")}
                                    >
                                        Répondre
                                    </button>
                                }

                            </div>
                        ))}
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    );
};

export default QuestionsVisiteurs;