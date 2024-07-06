import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjoutAnimaux = () => {

    const navigate = useNavigate();

    const [prenomAnimal, setPrenomAnimal] = useState("");
    const [data, setData] = useState([]);
    const [dataNomHabitat, setDataNomHabitat] = useState([]);

    const [nouvelAnimal, setNouvelAnimal] = useState({
        prenom: "",
        habitat: "",
        description: "",
        image: ""
    });

    const loadData = async () => {
        const reponse = await axios.get(BACKEND_URL + "/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const dataFiltrer = data.map(habitat => habitat.nom);
            setDataNomHabitat(dataFiltrer);
        }
    }, [data]);

    const prenom = useRef("");
    const race = useRef("");
    const habitat = useRef("");
    const description = useRef("");
    const image = useRef("");

    const inputChangement = (e) => {
        const { name, value } = e.target;

        const nouvelleValeur = value;

        setNouvelAnimal({
            ...nouvelAnimal,
            [name]: nouvelleValeur,
        });
    };

    const imageChangement = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setNouvelAnimal({
                ...nouvelAnimal,
                image: img
            });
        };
    };

    const ajouterAnimaux = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": token // Ajout du token dans l'en-tête Authorization
        };

        const formData = new FormData();

        formData.append("prenom", nouvelAnimal.prenom);
        formData.append("race", nouvelAnimal.race);
        formData.append("habitat", nouvelAnimal.habitat);
        formData.append("description", nouvelAnimal.description);
        formData.append("image", nouvelAnimal.image);

        if (token) {
            try {
                const reponse = axios.post(BACKEND_URL + "/ajout-animaux", formData, { headers })
                if (reponse) {
                    const reponse_mongoDB = axios.post(BACKEND_URL + "/ajout-animaux-vues", { prenomAnimal })
                    if (reponse_mongoDB) {
                        alert(`Animal ${nouvelAnimal.prenom} ajouté avec succès`);
                        prenom.current.value = "";
                        race.current.value = "";
                        habitat.current.value = "";
                        description.current.value = "";
                        image.current.value = "";
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            alert("Vous n'êtes pas autorisé à effectuer cette action");
        }
    };

    const effacer = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Etes-vous sûr de vouloir effacer votre saisie ?");
        if (confirmation) {
            prenom.current.value = "";
            race.current.value = "";
            habitat.current.value = "";
            description.current.value = "";
            image.current.value = "";
        }
    }

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <h2 className="titre_service">Ajouter animaux</h2>
            <div className="service">
                <button className="bouton_zoo" onClick={retour}>Retour</button>
            </div>
            <form className="formulaire" onSubmit={ajouterAnimaux} >
                <input
                    type="text"
                    name="prenom"
                    className="champsFormulaire"
                    id="prenom"
                    placeholder="Prénom..."
                    //ref={prenom}
                    onChange={(e) => {
                        setPrenomAnimal(e.target.value)
                        inputChangement(e)
                    }}
                    required
                />
                <label htmlFor="prenom"></label>

                <input
                    type="text"
                    name="race"
                    className="champsFormulaire"
                    id="race"
                    placeholder="Race..."
                    //ref={race}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="race"></label>

                <select
                    name="habitat"
                    id="habitat"
                    className="champsFormulaire"
                    //ref={habitat}
                    style={{ width: "140px" }}
                    onChange={inputChangement}
                    required
                >
                    <option value="">Choisissez l'habitat</option>
                    {dataNomHabitat.map((nomHabitat, index) => (
                        <option key={index} value={nomHabitat}>
                            {nomHabitat}
                        </option>
                    ))}
                </select>

                <textarea
                    name="description"
                    className="champsFormulaire_textarea"
                    id="description"
                    placeholder="Description..."
                    //ref={description}
                    onChange={inputChangement}
                    required
                />
                <label htmlFor="description"></label>

                <input
                    type="file"
                    name="image"
                    className="champsFormulaire_image"
                    id="image"
                    //ref={image}
                    onChange={imageChangement}
                    required
                />
                <label htmlFor="image"></label>

                <div className="centrer">
                    <button type="submit" className="bouton_zoo">Ajouter</button>
                    <button className="bouton_zoo" onClick={effacer}>Effacer</button>
                </div>
            </form>
        </ >
    );
};

export default AjoutAnimaux;