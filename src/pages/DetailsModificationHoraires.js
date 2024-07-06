import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from '../composants/Footer';
import Navigation from '../composants/Navigation';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import { useParams, useNavigate } from 'react-router-dom';

const DetailsModificationHoraires = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataHoraire, setDataHoraire] = useState([]);

    const idNombre = Number(id);

    const heure_ouverture = useRef("");
    const heure_fermeture = useRef("");

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/horaires");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataHoraire(data.find(horaire => horaire.id === idNombre));
        }
    }, [data]);

    const [horaire, setHoraire] = useState({
        id: "",
        jour: "",
        heure_ouverture: "",
        heure_fermeture: "",
        ouvert_fermer: ""
    });

    useEffect(() => {
        setHoraire(dataHoraire)
    }, [dataHoraire]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setHoraire({
            ...horaire,
            [name]: nouvelleValeur,
        });
    };

    const modifierHoraires = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            try {
                const reponse = axios.put(`http://localhost:3002/horaires/modifier/${id}`, horaire, { headers })
                if (reponse) {
                    alert(`Horaire pour le ${horaire.jour} modifier avec succès`)
                    retourDashboardAdminHoraires();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const retourDashboardAdminHoraires = () => {
        setTimeout(() => {
            navigate("/dashboard-admin/modifier-horaires");
        }, "10");
    }

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation && horaire.ouvert_fermer === "Ouvert") {
            heure_ouverture.current.value = "";
            heure_fermeture.current.value = "";
        } else {
            document.querySelector('input[name="ouvert_fermer"]').checked = false;
            window.location.reload();
        }
    }

    const retour = () => {
        navigate("/dashboard-admin/modifier-horaires");
    };

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Modifier horaire</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className="centrer">
                        <div className="conteneurHoraires">
                            <p>Jour : {horaire.jour}</p>
                            {horaire.ouvert_fermer === "Fermer" ?
                                <p>Horaire : {horaire.ouvert_fermer}</p>
                                :
                                <p>Horaire : {horaire.heure_ouverture} - {horaire.heure_fermeture}</p>
                            }
                            {horaire.ouvert_fermer === "Fermer" ?
                                <div>
                                    <p>Le zoo est actuellement fermé, réouvrez le pour changer les horaires</p>
                                </div>
                                :
                                <div>
                                    <input
                                        type="time"
                                        name="heure_ouverture"
                                        className="champsFormulaire"
                                        id="heure_ouverture"
                                        min="00:00"
                                        max="12:00"
                                        style={{ width: "auto" }}
                                        ref={heure_ouverture}
                                        onChange={inputChangement}
                                    />
                                    <label htmlFor="heure_ouverture"></label>

                                    <input
                                        type="time"
                                        name="heure_fermeture"
                                        className="champsFormulaire"
                                        id="heure_fermeture"
                                        min="00:00"
                                        max="12:00"
                                        style={{ width: "auto" }}
                                        ref={heure_fermeture}
                                        onChange={inputChangement}
                                    />
                                    <label htmlFor="heure_fermeture"></label>
                                </div>
                            }

                            {horaire.ouvert_fermer === "Fermer" ?
                                <>
                                    <input
                                        type="checkbox"
                                        name="ouvert_fermer"
                                        className="ouvert_fermer"
                                        id="ouvert_fermer"
                                        value="Ouvert"
                                        onClick={() => {
                                            alert(`Vous avez ouvert le zoo pour le ${horaire.jour}`)
                                        }}
                                        onChange={inputChangement}
                                    />
                                    <>Ouvrir le zoo</>
                                    < label htmlFor="ouvert_fermer" ></label>
                                </>
                                :
                                <>
                                    <input
                                        type="checkbox"
                                        name="ouvert_fermer"
                                        id="ouvert_fermer"
                                        value="Fermer"
                                        onClick={() => {
                                            alert(`Vous avez fermé le zoo pour le ${horaire.jour}`)
                                        }}
                                        onChange={inputChangement}
                                    />
                                    <>Fermer le zoo</>
                                    < label htmlFor="ouvert_fermer" ></label>
                                </>
                            }
                            <div className="centrer">
                                <button className="bouton_zoo" onClick={modifierHoraires}>Confirmer</button>
                                <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailsModificationHoraires;