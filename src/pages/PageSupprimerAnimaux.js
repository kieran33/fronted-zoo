import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SupprimerAnimaux from '../composants/SupprimerAnimaux';

const PageSupprimerAnimaux = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <SupprimerAnimaux />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageSupprimerAnimaux;