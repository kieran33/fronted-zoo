import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreationPersonnels = () => {

    const navigate = useNavigate();

    const nom_utilisateur = useRef("");
    const mot_de_passe = useRef("");

    const [nouveauxPersonnels, setNouveauxPersonnels] = useState({
        id: "",
        nom_utilisateur: "",
        mot_de_passe: "",
        role: ""
    });

    const inputChangement = (e) => {
        const { name, value } = e.target;

        setNouveauxPersonnels({
            ...nouveauxPersonnels,
            [name]: value,
        })
    };

    const creerPersonnels = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const contientChiffres = /\d/.test(nouveauxPersonnels.mot_de_passe);

        const testLettres = /[a-zA-Z]/g;

        const contientLettres = testLettres.test(nouveauxPersonnels.mot_de_passe);

        if (token) {
            if ((contientChiffres === true) && (contientLettres === true)) {
                try {
                    const reponse = await axios.post("http://localhost:3002/creer-personnels", nouveauxPersonnels, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                    });
                    if (reponse.status === 201 || reponse.status === 200) {
                        alert("Nouveau compte personnel créer avec succès");
                        nom_utilisateur.current.value = "";
                        mot_de_passe.current.value = "";
                        document.querySelector("#role_employe").checked = false;
                        document.querySelector("#role_veterinaire").checked = false;
                    }
                } catch (error) {
                    console.error("Erreur :", error.reponse ? error.reponse.data : error.message);
                    alert("Erreur lors de l'ajout du nouveau compte personnel")
                }
            }
            else {
                alert("Veuillez choisir un mot de passe contenant des lettres et des chiffres");
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    }

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
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Création compte personnel du zoo</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <form className="formulaire" onSubmit={creerPersonnels}>
                <input
                    type="text"
                    name="nom_utilisateur"
                    className="champsFormulaire"
                    id="nom_utilisateur"
                    placeholder="Nom utilisateur..."
                    ref={nom_utilisateur}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="nom_utilisateur"></label>

                <input
                    type="password"
                    name="mot_de_passe"
                    className="champsFormulaire"
                    id="mot_de_passe"
                    placeholder="Mot de passe..."
                    ref={mot_de_passe}
                    onChange={inputChangement}
                    required
                />

                <input
                    type="radio"
                    name="role"
                    className="champsFormulaire"
                    id="role_employe"
                    value="employé"
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="role">Employé</label>

                <input
                    type="radio"
                    name="role"
                    className="champsFormulaire"
                    id="role_veterinaire"
                    value="vétérinaire"
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="role">Vétérinaire</label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Créer</button>
                    <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                </div>
            </form>
        </>
    );
};

export default CreationPersonnels;