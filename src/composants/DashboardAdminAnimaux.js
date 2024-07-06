import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdminAnimaux = () => {

    const navigate = useNavigate();

    const pageAjoutAnimaux = () => {
        navigate("/dashboard-admin/ajout-animaux");
    };

    const pageModificationAnimaux = () => {
        navigate("/dashboard-admin/modification-animaux");
    };

    const pageSuppressionAnimaux = () => {
        navigate("/dashboard-admin/suppression-animaux");
    };

    return (
        <div>
            <h3 className="dashboard_text" onClick={pageAjoutAnimaux}>Ajouter animaux</h3>
            <h3 className="dashboard_text" onClick={pageModificationAnimaux}>Modifier animaux</h3>
            <h3 className="dashboard_text" onClick={pageSuppressionAnimaux}>Supprimer animaux</h3>
        </div>
    );
};

export default DashboardAdminAnimaux;