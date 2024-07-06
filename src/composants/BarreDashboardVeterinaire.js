import React from 'react';
import { useNavigate } from 'react-router-dom';

const BarreDashboardVeterinaire = () => {

    const navigate = useNavigate();

    const compteRenduAnimaux = () => {
        navigate("/dashboard-veterinaire/compte-rendu-animaux");
    };

    const avisHabitats = () => {
        navigate("/dashboard-veterinaire/avis-habitats");
    };

    return (
        <div className="barre_dashboard">
            <h2>Dashboard vétérinaire</h2>
            <div className="composant_dashboard">
                <h3 className="dashboard_text" onClick={compteRenduAnimaux}>Etat animaux</h3>
                <br></br>
                <h3 className="dashboard_text" onClick={avisHabitats}>Etat habitats</h3>
            </div>
        </div>
    );
};

export default BarreDashboardVeterinaire;