import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjoutHabitats = () => {

    const navigate = useNavigate();

    const [nouvelHabitat, setNouvelHabitat] = useState({
        id: "",
        nom: "",
        description: "",
        image: ""
    });

    const nom = useRef("");
    const description = useRef("");
    const image = useRef("");

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setNouvelHabitat({
            ...nouvelHabitat,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNouvelHabitat({
                ...nouvelHabitat,
                image: img
            });
        };
    };

    const ajouterHabitats = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append("nom", nouvelHabitat.nom);
        formData.append("description", nouvelHabitat.description);
        formData.append("image", nouvelHabitat.image);

        if (token) {
            try {
                const reponse = axios.post("http://localhost:3002/ajout-habitats", formData, { headers })
                if (reponse) {
                    alert(`Nouvel habitat ${nouvelHabitat.nom} ajouté avec succès`);
                    nom.current.value = "";
                    description.current.value = "";
                    image.current.value = "";
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    }

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            nom.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    }

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Ajouter habitats</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <form className="formulaire" onSubmit={ajouterHabitats} >
                <input
                    type="text"
                    name="nom"
                    className="champsFormulaire"
                    id="nom"
                    placeholder="Nom..."
                    ref={nom}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="nom"></label>

                <textarea
                    name="description"
                    className="champsFormulaire_textarea"
                    id="description"
                    placeholder="Description..."
                    ref={description}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="description"></label>

                <input
                    type="file"
                    name="image"
                    className="champsFormulaire_image"
                    id="image"
                    ref={image}
                    onChange={imageChangement}
                    required
                />
                <label htmlFor="image"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Ajouter</button>
                    <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                </div>
            </form>
        </>
    );
};

export default AjoutHabitats;