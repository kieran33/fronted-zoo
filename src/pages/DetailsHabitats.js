import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { Link } from 'react-router-dom';
//import { BACKEND_URL } from '../Constante';

const DetailsHabitats = () => {

    const [data, setData] = useState([]);
    const [dataHabitat, setDataHabitat] = useState([]);
    const [dataAnimaux, setDataAnimaux] = useState([]);
    const { id } = useParams();

    const idNombre = Number(id);

    const loadData = async () => {
        const reponse = await axios.get('https://backend-zoo-production.up.railway.app/habitats')
        setData(reponse.data);
    }

    const loadDataAnimaux = async () => {
        const reponse = await axios.get('https://backend-zoo-production.up.railway.app/animaux')
        setDataAnimaux(reponse.data);
    }

    useEffect(() => {
        loadData();
        loadDataAnimaux();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataHabitat(data.find(habitat => habitat.id === idNombre));
        }
    }, [data]);

    return (
        <>
            <Navigation />
            <div className="centrer">
                <div className="animal" >
                    <h2 className="titre_service">{dataHabitat.nom}</h2>
                    <img className="image_zoo_details"
                        src={`https://backend-zoo-production.up.railway.app/image/${dataHabitat.image}`}
                        alt={dataHabitat.nom}>
                    </img>
                    <p className="paragraphe">{dataHabitat.description}</p>
                    {dataHabitat.etat === "" ?
                        <></>
                        :
                        <div>
                            <h3 className="titre_service">L'avis du vétérinaire sur l'état de l'habitat</h3>
                            <p style={{ textAlign: "center" }}>{dataHabitat.etat}</p>
                        </div>
                    }
                    <h3 className="titre_service">Liste des animaux qui vivent dans cet habitat</h3>
                    <div className="centrer">
                        {dataAnimaux.filter(animal => (animal.habitat === dataHabitat.nom)).map((animal, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux" >
                                    <Link to={`/animaux/${animal.id}/${animal.prenom}`} style={{ opacity: "1" }}>
                                        <img className="image_zoo_animaux"
                                            src={`https://backend-zoo-production.up.railway.app/image/${animal.image}`}
                                            alt={animal.prenom}>
                                        </img>
                                    </Link>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="titre_service">Les autres habitats</h3>
                    <div className="centrer">
                        {data.filter(habitat => (habitat.nom !== dataHabitat.nom)).map((habitat, index) => (
                            <div className="animal" key={index}>
                                <div className="div_zoo_animaux" >
                                    <Link to={`/habitats/${habitat.id}`} style={{ opacity: "1" }} >
                                        <img className="image_zoo_animaux"
                                            src={`https://backend-zoo-production.up.railway.app/image/${habitat.image}`}
                                            alt={habitat.nom}
                                            onClick={() => {
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, "100")
                                            }}>
                                        </img>
                                    </Link>
                                    <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    );
};

export default DetailsHabitats;