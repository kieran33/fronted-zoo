import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

const DetailsAjoutNourritureAnimaux = () => {

    const navigate = useNavigate();

    const nourriture = useRef("");
    const quantite_nourriture = useRef("");
    const date_nourriture = useRef("");

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataAnimal, setDataAnimal] = useState([]);
    const { prenom } = useParams();

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataAnimal(data.find(animal => animal.id === idNombre));
        }
    }, [data]);

    const [animal, setAnimal] = useState({
        nourriture: "",
        quantite_nourriture: "",
        date_nourriture: ""
    });

    useEffect(() => {
        setAnimal(dataAnimal)
    }, [dataAnimal]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setAnimal({
            ...animal,
            [name]: nouvelleValeur,
        });
    };

    const AjouterNourritureAnimaux = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append("nourriture", animal.nourriture);
        formData.append("quantite_nourriture", animal.quantite_nourriture);
        formData.append("date_nourriture", animal.date_nourriture);

        if (token) {
            try {
                const reponse = axios.put(`http://localhost:3002/ajout-nourriture/${prenom}`, formData, { headers })
                if (reponse) {
                    alert(`Nourriture pour l'animal ${animal.prenom} ajouté avec succès`);
                    nourriture.current.value = "";
                    quantite_nourriture.current.value = "";
                    date_nourriture.current.value = "";
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
        nourriture.current.value = "";
        quantite_nourriture.current.value = "";
        date_nourriture.current.value = "";
    }

    const retour = () => {
        navigate("/dashboard-employe/ajout-nourriture");
    };

    return (
        <>
            <div className="dashboard_global" >
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Ajouter nourriture pour l'animal {animal.prenom}</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={AjouterNourritureAnimaux}>
                            <input
                                type="text"
                                name="nourriture"
                                className="champsFormulaire_nourrir"
                                id="nourriture"
                                placeholder="Nourriture de l'animal..."
                                ref={nourriture}
                                onChange={inputChangement}
                                required
                            />
                            <label htmlFor="nourriture"></label>

                            <input
                                type="text"
                                name="quantite_nourriture"
                                className="champsFormulaire_nourrir"
                                id="quantite_nourriture"
                                placeholder="Quantitée nourriture..."
                                ref={quantite_nourriture}
                                onChange={inputChangement}
                                required
                            />
                            <label htmlFor="quantite_nourriture"></label>

                            <input
                                type="date"
                                name="date_nourriture"
                                className="champsFormulaire_nourrir"
                                id="date_nourriture"
                                ref={date_nourriture}
                                onChange={inputChangement}
                                required
                            />
                            <label htmlFor="date_nourriture"></label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
                                <button className="bouton_zoo" onClick={effacer}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailsAjoutNourritureAnimaux;