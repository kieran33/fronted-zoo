import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get("http://localhost:3002/services");
        setData(reponse.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navigation />
            <h1 className="titre_service">Nos services</h1>
            <div className="centrer">
                {data.map((service, index) => (
                    <div className="service" key={index}>
                        <p className="titre_service" style={{ textTransform: 'capitalize' }}>{service.nom}</p>
                        <img className="image_service" src={`http://localhost:3002/image/${service.image}`} alt={service.nom}></img>
                        <p className="paragraphe">{service.description}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div >
    );
};

export default Services;