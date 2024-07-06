import React from 'react';
import Navigation from '../composants/Navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const DetailsModificationPersonnels = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [dataPersonnel, setDataPersonnel] = useState([]);

    const nom_utilisateur = useRef("");
    const mot_de_passe = useRef("");

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/personnels");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataPersonnel(data.find(personnel => personnel.id === idNombre));
        }
    }, [data]);

    const [personnel, setPersonnel] = useState({
        id: "",
        nom_utilisateur: "",
        mot_de_passe: "",
        role: ""
    });

    useEffect(() => {
        setPersonnel(dataPersonnel)
    }, [dataPersonnel]);

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setPersonnel({
            ...personnel,
            [name]: nouvelleValeur,
        });
    };

    const modifierPersonnels = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        if (token) {
            try {
                const reponse = axios.put(`http://localhost:3002/personnels/modifier/${id}`, personnel, { headers })
                if (reponse) {
                    alert(`Compte personnel ${personnel.nom_utilisateur} modifié avec succès`);
                }
            } catch (error) {
                console.log(error);
                alert("Erreur lors de la modification du compte personnel")
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            nom_utilisateur.current.value = "";
            mot_de_passe.current.value = "";
            document.querySelector("#role_employe").checked = false;
            document.querySelector("#role_veterinaire").checked = false;
        }
    }

    const retour = () => {
        navigate("/dashboard-admin/modification-personnels");
    };

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Modifier personnels {personnel.nom_utilisateur}</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className="centrer">
                        <form className="formulaire" onSubmit={modifierPersonnels}>
                            <input
                                type="text"
                                name="nom_utilisateur"
                                className="champsFormulaire"
                                id="nom_utilisateur"
                                placeholder="Nom utilisateur..."
                                defaultValue={personnel.nom_utilisateur}
                                ref={nom_utilisateur}
                                onChange={inputChangement}
                            />
                            <label htmlFor="nom_utilisateur"></label>

                            <input
                                type="password"
                                name="mot_de_passe"
                                className="champsFormulaire"
                                id="mot_de_passe"
                                placeholder="Mot de passe..."
                                defaultValue={personnel.mot_de_passe}
                                ref={mot_de_passe}
                                onChange={inputChangement}
                            />

                            <input
                                type="radio"
                                name="role"
                                className="champsFormulaire"
                                id="role_employe"
                                value="employé"
                                onChange={inputChangement}
                            />
                            <label htmlFor="role">Employé</label>

                            <input
                                type="radio"
                                name="role"
                                className="champsFormulaire"
                                id="role_veterinaire"
                                value="vétérinaire"
                                onChange={inputChangement}
                            />
                            <label htmlFor="role">Vétérinaire</label>

                            <div className="centrer">
                                <button type="submit" className="bouton_zoo">Confirmer</button>
                                <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailsModificationPersonnels;