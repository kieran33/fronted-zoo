import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SupprimerServices from '../composants/SupprimerServices';

const PageSupprimerServices = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
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

export default PageSupprimerServices;