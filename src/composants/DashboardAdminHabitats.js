import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminHabitats = () => {

    const navigate = useNavigate();

    const pageAjoutHabitats = () => {
        navigate("/dashboard-admin/ajout-habitats");
    };

    const pageModificationHabitats = () => {
        navigate("/dashboard-admin/modification-habitats");
    };

    const pageSuppressionHabitats = () => {
        navigate("/dashboard-admin/suppression-habitats");
    };

    return (
        <div>
            <h3 className="dashboard_text" onClick={pageAjoutHabitats}>Ajouter habitats</h3>
            <h3 className="dashboard_text" onClick={pageModificationHabitats}>Modifier habitats</h3>
            <h3 className="dashboard_text" onClick={pageSuppressionHabitats}>Supprimer habitats</h3>
        </div>
    );
};

export default DashboardAdminHabitats;