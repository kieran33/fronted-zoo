import React from 'react';
import CreationPersonnels from '../composants/CreationPersonnels';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';

const PageCreationComptePersonnels = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <CreationPersonnels />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageCreationComptePersonnels;