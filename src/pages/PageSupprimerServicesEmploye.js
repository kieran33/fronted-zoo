import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import SupprimerServices from '../composants/SupprimerServices';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';

const PageSupprimerServicesEmploye = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <SupprimerServices />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageSupprimerServicesEmploye;