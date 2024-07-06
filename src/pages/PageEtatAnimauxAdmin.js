import React from 'react';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import EtatAnimaux from '../composants/EtatAnimaux';

const PageEtatAnimauxAdmin = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <EtatAnimaux />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageEtatAnimauxAdmin;