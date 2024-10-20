import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
//import { BACKEND_URL } from '../Constante';

const Animaux = () => {

    const role = localStorage.getItem('role');

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [dataTrier, setDataTrier] = useState([])
    const [prenom, setPrenom] = useState("")
    const [id, setId] = useState("");

    const loadData = async () => {
        const reponse = await axios.get("https://backend-zoo-production.up.railway.app/animaux");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setDataTrier(data.sort(function compare(a, b) {
                if (a.prenom.toUpperCase() < b.prenom.toUpperCase()) {
                    return -1;
                }
                else if (a.prenom.toUpperCase() > b.prenom.toUpperCase()) {
                    return 1;
                }
                else {
                    return 0;
                }
            }));
        }
    }, [data]);

    const augmenterVue = () => {
        try {
            axios.put(`https://backend-zoo-production.up.railway.app/augmenter-vues-animal`, { prenom })
        } catch (error) {
            console.log(error);
        }
    };

    const detailsAnimaux = () => {
        navigate(`/animaux/${id}/${prenom}`)
    }

    useEffect(() => {
        if (role === null) {
            augmenterVue()
        }
        if (id !== "" && prenom !== "") {
            detailsAnimaux()
        }
    }, [id, prenom])

    return (
        <>
            <Navigation />
            <h1 className="titre_service">Nos animaux</h1>
            <div className="centrer">
                {dataTrier.map((animal, index) => (
                    <div className="animal" key={index}>
                        <div className="div_zoo_animaux" >
                            <img className="image_zoo_animaux"
                                src={`https://backend-zoo-production.up.railway.app/image/${animal.image}`}
                                alt={animal.prenom}
                                onClick={() => {
                                    setPrenom(animal.prenom)
                                    setId(animal.id)
                                }}>
                            </img>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{animal.prenom}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </ >
    );
};

export default Animaux;