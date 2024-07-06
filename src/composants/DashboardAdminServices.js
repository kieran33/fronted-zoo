import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminServices = () => {

    const navigate = useNavigate();

    const pageAjoutServices = () => {
        navigate("/dashboard-admin/ajout-services");
    };

    const pageModificationServices = () => {
        navigate("/dashboard-admin/modification-services");
    };

    const pageSuppressionServices = () => {
        navigate("/dashboard-admin/suppression-services");
    };

    return (
        <div>
            <h3 className="dashboard_text" onClick={pageAjoutServices}>Ajouter services</h3>
            <h3 className="dashboard_text" onClick={pageModificationServices}>Modifier services</h3>
            <h3 className="dashboard_text" onClick={pageSuppressionServices}>Supprimer services</h3>
        </div>
    );
};

export default DashboardAdminServices;