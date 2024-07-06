import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import SuppressionPersonnels from '../composants/SuppressionPersonnels';

const PageSuppressionComptePersonnels = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <SuppressionPersonnels />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageSuppressionComptePersonnels;