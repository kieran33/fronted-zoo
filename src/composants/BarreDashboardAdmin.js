import React from 'react';
import DashboardAdminAnimaux from './DashboardAdminAnimaux';
import DashboardAdminHabitats from './DashboardAdminHabitats';
import DashboardAdminPersonnels from './DashboardAdminPersonnels';
import DashboardAdminServices from './DashboardAdminServices';
import { useNavigate } from 'react-router-dom';

const BarreDashboardAdmin = () => {

    const navigate = useNavigate();

    const etatAnimaux = () => {
        navigate("/dashboard-admin/etat-animaux");
    };

    const etatHabitats = () => {
        navigate("/dashboard-admin/etat-habitats");
    };

    const modifierHoraires = () => {
        navigate("/dashboard-admin/modifier-horaires");
    };

    const animauxPopulaires = () => {
        navigate("/dashboard-admin/animaux-populaires");
    };

    return (
        <div className="barre_dashboard">
            <h2>Dashboard admin</h2>
            <div className="composant_dashboard">
                <DashboardAdminPersonnels />
                <br></br>
                <DashboardAdminAnimaux />
                <br></br>
                <DashboardAdminHabitats />
                <br></br>
                <DashboardAdminServices />
                <br></br>
                <div >
                    <h3 className="dashboard_text" onClick={modifierHoraires}>Modifier horaires</h3>
                </div>
                <br></br>
                <div>
                    <h3 className="dashboard_text" onClick={etatAnimaux}>Etat animaux</h3>
                    <h3 className="dashboard_text" onClick={etatHabitats}>Etat habitats</h3>
                </div>
                <br></br>
                <div >
                    <h3 className="dashboard_text" onClick={animauxPopulaires}>Animaux populaires</h3>
                </div>
            </div>
        </div>
    );
};

export default BarreDashboardAdmin;