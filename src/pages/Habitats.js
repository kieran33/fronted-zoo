import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { BACKEND_URL } from '../Constante';

const Habitats = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("https://backend-zoo-production.up.railway.app/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navigation />
            <h1 className="titre_service">Nos habitats</h1>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="habitat" key={index}>
                        <div className="div_zoo_habitat">
                            <Link to={`/habitats/${habitat.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_habitat" src={`https://backend-zoo-production.up.railway.app/image/${habitat.image}`} alt={habitat.nom}>
                                </img>
                            </Link>
                            <div className="text_zoo" style={{ textTransform: 'capitalize' }}>{habitat.nom}</div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Habitats;