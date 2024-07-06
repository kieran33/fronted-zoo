import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import { useNavigate } from 'react-router-dom';

const DetailsCompteRenduAnimaux = () => {

    const navigate = useNavigate();

    const date_soins = useRef("");
    const etat = useRef("");

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataAnimal, setDataAnimal] = useState([]);
    const [dataNourriture, setDataNourriture] = useState([]);

    const { prenom } = useParams();

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/animaux");
        setData(reponse.data);
    };

    const loadDataNourriture = async () => {
        const reponse = await axios.get("http://localhost:3002/nourriture-animaux");
        setDataNourriture(reponse.data);
    };

    useEffect(() => {
        loadData();
        loadDataNourriture();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataAnimal(data.find(animal => animal.id === idNombre));
        }
    }, [data]);

    const [animal, setAnimal] = useState({
        etat: "",
        date_soins: ""
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

    const AjouterCompteRenduAnimaux = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append("etat", animal.etat);
        formData.append("date_soins", animal.date_soins)

        if (token) {
            try {
                const reponse = axios.post(`http://localhost:3002/ajout-soins/${prenom}`, formData, { headers })
                if (reponse) {
                    alert(`Compte rendu pour l'animal ${animal.prenom} envoyé avec succès`);
                    date_soins.current.value = "";
                    etat.current.value = "";
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const filtreAnimal = dataNourriture.filter(nourriture => nourriture.prenom === animal.prenom);

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            date_soins.current.value = "";
            etat.current.value = "";
        }
    };

    const retour = () => {
        navigate("/dashboard-veterinaire/compte-rendu-animaux");
    };

    return (
        <>
            <div className="dashboard_global" >
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Liste de ce que l'animal {animal.prenom} à consommé</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className='centrer' >
                        {filtreAnimal.map((animal, index) => (
                            <div key={index} className="animal">
                                <p className="titre_service">Type de nourriture : {animal.nourriture}</p>
                                <p className="titre_service">Quantité : {animal.quantite_nourriture}</p>
                                <p className="titre_service">Date : {animal.date_nourriture}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="titre_service">Ecrire compte rendu pour l'animal {animal.prenom}</h2>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={AjouterCompteRenduAnimaux}>
                            <textarea
                                name="etat"
                                className="champsFormulaire_textarea"
                                id="etat"
                                placeholder="Etat animal..."
                                ref={etat}
                                onChange={inputChangement}
                                required
                            />
                            <label htmlFor="etat"></label>

                            <input
                                type="date"
                                name="date_soins"
                                className="champsFormulaire"
                                id="date_soins"
                                placeholder="Date et heure"
                                style={{ width: "125px" }}
                                ref={date_soins}
                                onChange={inputChangement}
                                required
                            />
                            <label htmlFor="date_soins"></label>

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

export default DetailsCompteRenduAnimaux;