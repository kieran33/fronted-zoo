import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationPersonnels from '../composants/ModificationPersonnels';

const PageModificationComptePersonnels = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationPersonnels />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageModificationComptePersonnels;