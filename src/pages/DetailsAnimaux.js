import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import Famille from '../image/famille_animaux.png';
import Habitat from '../image/habitat_animaux.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DetailsAnimaux = () => {

    const role = localStorage.getItem('role');

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [dataAnimal, setDataAnimal] = useState([]);
    const [dataHabitat, setDataHabitat] = useState([]);
    const [dataEtat, setDataEtat] = useState([]);
    const [dataEtatAnimal, setDataEtatAnimal] = useState([]);
    const [dernierSoins, setDernierSoins] = useState([]);
    const [prenomNouvelAnimal, setPrenomNouvelAnimal] = useState("")
    const { id } = useParams();
    const { prenom } = useParams();
    const [idAnimal, setIdAnimal] = useState("");

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get('http://localhost:3002/animaux')
        setData(reponse.data);
    };

    const loadDataHabitat = async () => {
        const reponse = await axios.get('http://localhost:3002/habitats')
        setDataHabitat(reponse.data);
    };

    const loadDataEtat = async () => {
        const reponse = await axios.get('http://localhost:3002/soins-animaux')
        setDataEtat(reponse.data);
    };

    useEffect(() => {
        loadData();
        loadDataEtat();
        loadDataHabitat();
    }, []);

    useEffect(() => {
        if (data.length > 0 && dataEtat.length > 0) {
            setDataAnimal(data.find(animal => animal.id === idNombre));
            setDataEtatAnimal(dataEtat.filter(animal => animal.prenom === prenom));
        }
    }, [data]);

    console.log('dataEtatAnimal', dataEtatAnimal);

    useEffect(() => {
        if (dataEtatAnimal.length > 0) {
            setDernierSoins(dataEtatAnimal[dataEtatAnimal.length - 1]);
        }
    }, [dataEtatAnimal])

    console.log(dernierSoins)

    const augmenterVue = () => {
        try {
            axios.put(`http://localhost:3002/augmenter-vues-animal`, { prenomNouvelAnimal })
        } catch (error) {
            console.log(error);
        }
    };

    const detailsAnimaux = () => {
        navigate(`/animaux/${idAnimal}/${prenomNouvelAnimal}`);

        setTimeout(() => {
            window.location.reload();
        }, "200");
    }

    useEffect(() => {
        if (role === null) {
            augmenterVue()
        }

        if (idAnimal !== "" && prenomNouvelAnimal !== "") {
            detailsAnimaux()
        }
    }, [idAnimal, prenomNouvelAnimal])

    return (
        <>
            <Navigation />
            <div className="centrer">
                <div className="animal" >
                    <h2 className="titre_service">{dataAnimal.prenom}</h2>
                    <img className="image_zoo_details"
                        src={`http://localhost:3002/image/${dataAnimal.image}`}
                        alt={dataAnimal.prenom}>
                    </img>
                    <p className="paragraphe">{dataAnimal.description}</p>
                    <div className="centrer">
                        <div className="service" style={{ margin: "25px" }}>
                            <img src={Famille} alt={Famille}></img>
                            <p>{dataAnimal.race}</p>
                        </div>
                        <div className="service" style={{ margin: "25px" }}>
                            <img src={Habitat} alt={Habitat} style={{ width: "50px", height: "50px" }}></img>
                            <p>{dataAnimal.habitat}</p>
                        </div>
                    </div>
                    <div>
                        {dernierSoins.date_soins === undefined ?
                            <></>
                            :
                            <div>
                                <h3 className="titre_service">L'avis du vétérinaire le plus récent sur l'état de l'animal</h3>
                                <p style={{ textAlign: "center" }}>Date : {dernierSoins.date_soins}</p>
                                <p style={{ textAlign: "center" }}>{dernierSoins.etat}</p>
                            </div>
                        }
                    </div>
                    <h3 className="titre_service">Habitat {dataAnimal.prenom}</h3>
                    <div className="centrer">
                        {dataHabitat.filter(habitat => habitat.nom === dataAnimal.habitat).map((habitat, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux" >
                                    <Link to={`/habitats/${habitat.id}`} style={{ opacity: "1" }}>
                                        <img className="image_zoo_animaux"
                                            src={`http://localhost:3002/image/${habitat.image}`}
                                            alt={habitat.nom}>
                                        </img>
                                    </Link>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="titre_service">Liste des autres animaux qui vivent dans l'habitat {dataAnimal.habitat}</h3>
                    <div className="centrer">
                        {data.filter(animaux => (animaux.habitat === dataAnimal.habitat) && (animaux.prenom !== dataAnimal.prenom)).map((animal, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux">
                                    <img className="image_zoo_animaux"
                                        src={`http://localhost:3002/image/${animal.image}`}
                                        alt={animal.prenom}
                                        onClick={() => {
                                            setPrenomNouvelAnimal(animal.prenom)
                                            setIdAnimal(animal.id)
                                        }}>
                                    </img>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="titre_service">Liste des autres habitats</h3>
                    <div className="centrer">
                        {dataHabitat.filter(habitat => habitat.nom !== dataAnimal.habitat).map((habitat, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux" >
                                    <Link to={`/habitats/${habitat.id}`} style={{ opacity: "1" }}>
                                        <img className="image_zoo_animaux"
                                            src={`http://localhost:3002/image/${habitat.image}`}
                                            alt={habitat.nom}>
                                        </img>
                                    </Link>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
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

export default DetailsAnimaux;