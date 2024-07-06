import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardEmploye from '../composants/BarreDashboardEmploye';
import ModificationServicesEmploye from '../composants/ModificationServicesEmploye';

const PageModifierServicesEmploye = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardEmploye />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationServicesEmploye />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageModifierServicesEmploye;