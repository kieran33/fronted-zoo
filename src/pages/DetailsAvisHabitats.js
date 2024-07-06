import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import Footer from '../composants/Footer';
import { useNavigate } from 'react-router-dom';

const DetailsAvisHabitats = () => {

    const navigate = useNavigate();

    const etat = useRef("");

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataHabitat, setDataHabitat] = useState([]);

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataHabitat(data.find(habitat => habitat.id === idNombre));
        }
    }, [data]);

    const [habitat, setHabitat] = useState({
        etat: ""
    });

    useEffect(() => {
        setHabitat(dataHabitat)
    }, [dataHabitat]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setHabitat({
            ...habitat,
            [name]: nouvelleValeur,
        });
    };

    const avisHabitats = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append("etat", habitat.etat);

        if (token) {
            try {
                const reponse = axios.put(`http://localhost:3002/avis-habitats/${id}`, formData, { headers })
                if (reponse) {
                    alert(`Avis pour l'état de l'habitat ${habitat.nom} envoyé avec succès`);
                    etat.current.value = "";
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            etat.current.value = "";
        }
    };

    const retour = () => {
        navigate("/dashboard-veterinaire/avis-habitats");
    };

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Ecrire compte rendu pour l'habitat {habitat.nom} </h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <form className="formulaire" onSubmit={avisHabitats}>
                        <textarea
                            name="etat"
                            className="champsFormulaire_textarea"
                            id="etat"
                            placeholder="Etat de l'habitat..."
                            ref={etat}
                            onChange={inputChangement}
                            required
                        />
                        <label htmlFor="etat"></label>

                        <div className="centrer">
                            <button type="submit" className="bouton_zoo">Confirmer</button>
                            <button className="bouton_zoo" onClick={effacer}>Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailsAvisHabitats;