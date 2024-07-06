import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardEmployeServices = () => {

    const navigate = useNavigate();

    const pageAjoutServices = () => {
        navigate("/dashboard-employe/ajout-services");
    };

    const pageModificationServices = () => {
        navigate("/dashboard-employe/modification-services");
    };

    const pageSuppressionServices = () => {
        navigate("/dashboard-employe/suppression-services");
    };

    return (
        <div className="dashboard_categorie">
            <h3 className="dashboard_text" onClick={pageAjoutServices}>Ajouter services</h3>
            <h3 className="dashboard_text" onClick={pageModificationServices}>Modifier services</h3>
            <h3 className="dashboard_text" onClick={pageSuppressionServices}>Supprimer services</h3>
        </div>
    );
};

export default DashboardEmployeServices;