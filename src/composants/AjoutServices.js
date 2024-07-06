import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjoutServices = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const nom = useRef("");
    const description = useRef("");
    const image = useRef("");

    const [nouveauService, setNouveauService] = useState({
        id: "",
        nom: "",
        description: "",
        image: ""
    });

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setNouveauService({
            ...nouveauService,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNouveauService({
                ...nouveauService,
                image: img
            });
        };
    };

    const ajouterServices = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append("nom", nouveauService.nom);
        formData.append("description", nouveauService.description);
        formData.append("image", nouveauService.image);

        if (token) {
            const reponse = axios.post("http://localhost:3002/ajout-services", formData, { headers })
            /*.then(reponse => {
                console.log(reponse.data);
            })
            .catch(error => {
                console.error(error);
            });*/
            if (reponse) {
                alert(`Service ${nouveauService.nom} ajouté avec succès`);
                nom.current.value = "";
                description.current.value = "";
                image.current.value = "";
            }
        } else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

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
        if (role === "admin") {
            navigate("/dashboard-admin");
        } else {
            navigate("/dashboard-employe")
        }
    };

    return (
        <>
            <h2 className="titre_service">Ajouter un service</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <form className="formulaire" onSubmit={ajouterServices} >
                <input
                    type="text"
                    name="nom"
                    className="champsFormulaire"
                    id="nom"
                    placeholder="Nom du service..."
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

export default AjoutServices;