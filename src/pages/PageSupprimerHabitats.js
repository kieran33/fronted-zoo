import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SupprimerHabitats from '../composants/SupprimerHabitats';

const PageSupprimerHabitats = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <SupprimerHabitats />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageSupprimerHabitats;