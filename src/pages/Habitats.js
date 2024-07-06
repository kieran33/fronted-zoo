import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Habitats = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/habitats");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navigation />
            <h2 className="titre_service">Les habitats</h2>
            <div className="centrer">
                {data.map((habitat, index) => (
                    <div className="habitat" key={index}>
                        <div className="div_zoo_habitat">
                            <Link to={`/habitats/${habitat.id}`} style={{ opacity: "1" }}>
                                <img className="image_zoo_habitat" src={`http://localhost:3002/image/${habitat.image}`} alt={habitat.nom}>
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