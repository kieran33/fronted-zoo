import React, { useEffect, useState } from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../Constante';

const AnimauxPopulaires = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [dataAnimauxTrier, setDataAnimauxTrier] = useState([]);
    const [dataAnimaux, setDataAnimaux] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get(BACKEND_URL + "/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        axios.get(BACKEND_URL + '/vues-animaux')
            .then(animaux => setDataAnimaux(animaux.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (dataAnimaux.length > 0) {
            setDataAnimauxTrier(dataAnimaux.sort(function compare(a, b) {
                if (a.nombreVues > b.nombreVues) {
                    return -1;
                }
                else if (a.nombreVues < b.nombreVues) {
                    return 1;
                }
                else {
                    return 0;
                }
            }));
        }
    }, [dataAnimaux]);

    const retour = () => {
        navigate("/dashboard-admin");
    };

    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Animaux populaires</h2>
                    <div className="service">
                        <button className="bouton_zoo" onClick={retour}>Retour</button>
                    </div>
                    <div className="centrer">
                        {dataAnimauxTrier.map((dataAnimal, index) => (
                            <div className="animal" key={index}>
                                <p className="titre_service">{dataAnimal.nombreVues} vues</p>
                                {data.map((animal, index) => (
                                    <div key={index}>
                                        {
                                            dataAnimal.prenom === animal.prenom ?
                                                <img className="image_zoo_animaux_etat"
                                                    src={BACKEND_URL + `/image/${animal.image}`}
                                                    alt={animal.prenom}
                                                >
                                                </img>
                                                :
                                                null
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div >
            </div>
            <Footer />
        </ >
    );
};

export default AnimauxPopulaires;