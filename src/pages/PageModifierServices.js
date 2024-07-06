import React from 'react';
import Navigation from '../composants/Navigation';
import Footer from '../composants/Footer';
import BarreDashboardAdmin from '../composants/BarreDashboardAdmin';
import ModificationServices from '../composants/ModificationServices';

const PageModifierServices = () => {
    return (
        <>
            <div className="dashboard_global">
                <div>
                    <BarreDashboardAdmin />
                </div>
                <div className="dashboard_composants_centrer">
                    <Navigation />
                    <ModificationServices />
                </div >
            </div>
            <Footer />
        </>
    );
};

export default PageModifierServices;