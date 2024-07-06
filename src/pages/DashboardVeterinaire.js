import React from 'react';
import Navigation from '../composants/Navigation';
import BarreDashboardVeterinaire from '../composants/BarreDashboardVeterinaire';
import Footer from '../composants/Footer';

const DashboardVeterinaire = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardVeterinaire />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <h2 className="titre_service">Dashboard vétérinaire</h2>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DashboardVeterinaire;