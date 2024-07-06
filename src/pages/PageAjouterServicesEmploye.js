import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';
import AjoutServices from '../composants/AjoutServices';

const PageAjouterServicesEmploye = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <AjoutServices />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageAjouterServicesEmploye;