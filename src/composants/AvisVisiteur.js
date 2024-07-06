import React from 'react';
import DonnerAvis from './DonnerAvis';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AvisVisiteur = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const reponse = await axios.get('http://localhost:3002/avis-verif')
        setData(reponse.data)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="conteneurAvis">
            <h2 className="titre_service">Nos visiteurs parle de nous</h2>
            <div>
                {data.map((avis, index) => (
                    < div className="avis_visiteur" key={index} >
                        <div >
                            <h4>{avis.pseudo}</h4>
                        </div>
                        <p>{avis.message}</p>
                    </div>
                ))}
            </div>
            <DonnerAvis />
        </div >
    );
};

export default AvisVisiteur;


