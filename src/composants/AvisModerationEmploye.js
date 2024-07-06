import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import BarreDashboardEmploye from './BarreDashboardEmploye';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const AvisModerationEmploye = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get('http://localhost:3002/avis-non-verif')
        setData(reponse.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    const supprimerAvis = (id) => {

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet avis ?")) {
                axios.delete(`http://localhost:3002/supprimer/avis-non-verif/${id}`, { headers });
                setTimeout(() => loadData(), 500);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    }

    const supprimerTousLesAvis = () => {

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement tous ces avis ?")) {
                axios.delete(`http://localhost:3002/supprimer/avis-verif`, { headers });
                setTimeout(() => loadData(), 500);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    }

    const approuverAvis = async (id, pseudo, message) => {

        const token = localStorage.getItem("token");

        const headers = {
            'Content-Type': 'application/json',
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            try {
                const reponse = await axios.post('http://localhost:3002/ajout-avis-verif', { pseudo, message }, { headers });
                alert('Avis approuvé avec succès')
                if (reponse.data) {
                    axios.delete(`http://localhost:3002/supprimer/avis-non-verif/${id}`, { headers });
                    setTimeout(() => loadData(), 500);
                }
            } catch (error) {
                console.error('Erreur:', error.response ? error.response.data : error.message);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    }

    const retour = () => {
        navigate("/dashboard-employe");
    };

    return (
        < >
            <div className="dashboard_global">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Espace modération des avis</h2>
                    <div className="service">
                        <button className="bouton_zoo" style={{ marginRight: "20px", marginLeft: "20px", marginBottom: "20px" }} onClick={() => supprimerTousLesAvis()}>
                            Supprimer tous les avis de la page d'accueil
                        </button>
                        <button className="bouton_zoo" style={{ marginBottom: "20px" }} onClick={retour}>Retour</button>
                    </div>
                    <div className="conteneurAvis">
                        {data.map((avis, index) => (
                            <div className="avis_visiteur" index={index}>
                                <div>
                                    <h4>
                                        {avis.pseudo}
                                    </h4>
                                </div>
                                <p>{avis.message}</p>
                                <div className="centrer">
                                    <button
                                        type="button"
                                        id="boutonSupprimerAvis"
                                        name="boutonSupprimerAvis"
                                        value={avis.id}
                                        className="bouton_zoo"
                                        onClick={() => supprimerAvis(avis.id)}
                                    >
                                        Supprimer
                                    </button>
                                    <button
                                        type="button"
                                        id="boutonApprouverAvis"
                                        name="boutonApprouverAvis"
                                        value={avis.pseudo}
                                        className="bouton_zoo"
                                        onClick={() => approuverAvis(avis.id, avis.pseudo, avis.message)}
                                    >
                                        Approuver
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AvisModerationEmploye;